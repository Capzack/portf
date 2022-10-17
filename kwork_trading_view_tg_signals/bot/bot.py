from threading import Thread

from django.db.models import Q
from telebot import types
from bot.models import Client, PairSerializer, PairGroupSerializer, PairGroup, TariffSerializer, Tariff

import telebot


class Bot:
    def __init__(self, token, provider_token):
        self.bot = telebot.TeleBot(token)
        self.provider_token = provider_token
        self.chat_status = {}

        @self.bot.message_handler(commands=['start'])
        def start_message(message):
            self.bot.send_message(message.chat.id, self._get_client(message).get_hello_message(), reply_markup=self._get_menu_marktup(message))

        @self.bot.message_handler(content_types=["text"])
        def handle_text(message):
            markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
            strip = message.text.strip()
            if self._get_client(message).is_active() or strip == 'Тарифы':
                if strip == 'Пары':
                    answer = self._get_client(message).get_subscribed_pairs_message()
                    # if len(self._client_pair(message)) != len([x for xs in [x['pairs'] for x in self.available_pair] for x in xs]):
                    markup.add(types.KeyboardButton("Подписаться на новую пару"))
                    if self._client_pair(message):
                        markup.add(types.KeyboardButton("Отписаться от пары"))
                    markup.add(types.KeyboardButton("Назад"))

                elif strip == "Назад":
                    self.chat_status[message.chat.id] = ''
                    answer = self._get_client(message).get_menu_message()
                    markup = self._get_menu_marktup(message)

                elif strip == "Подписаться на новую пару":
                    answer = self._get_client(message).get_choose_pair_group_message()
                    for i in self.available_pair:
                        if set(i['pairs']) - set(self._client_pair(message)):
                            markup.add(types.KeyboardButton(i['view']))
                    markup.add(types.KeyboardButton("Назад"))

                elif strip in [x['view'] for x in self.available_pair]:
                    self.chat_status[message.chat.id] = ''
                    answer = self._get_client(message).get_choose_pair_message()
                    for i in self.available_pair:
                        if i['view'] == strip:
                            for j in i['pairs']:
                                markup.add(types.KeyboardButton(j))
                    markup.add(types.KeyboardButton("Назад"))

                elif strip == "Отписаться от пары":
                    answer = self._get_client(message).get_unsubscribe_to_pair_message()
                    for i in self._client_pair(message):
                        markup.add(i)
                    markup.add(types.KeyboardButton("Назад"))

                elif strip in [x for xs in [x['pairs'] for x in self.available_pair] for x in xs]:
                    self.chat_status[message.chat.id] = strip
                    answer = self._get_client(message).get_choose_timeframe_message()
                    for i in self.get_available_timeframes(message, strip):
                        markup.add(types.KeyboardButton(i))
                    markup.add(types.KeyboardButton("Назад"))

                elif strip in self._client_pair(message):
                    a = strip.split(' ', 1)
                    self._get_client(message).unsubscribe_to_pair(a[0], a[1])
                    answer = self._get_client(message).get_after_unsubscribed_to_pair_message(a[0], a[1])
                    markup = self._get_menu_marktup(message)

                elif message.chat.id in self.chat_status and self.chat_status[message.chat.id] != '':
                    self._get_client(message).subscribe_to_pair(self.chat_status[message.chat.id], strip)
                    answer = self._get_client(message).get_subscribe_to_pair_message(self.chat_status[message.chat.id], strip)
                    self.chat_status[message.chat.id] = ''
                    markup = self._get_menu_marktup(message)

                elif strip == "Тарифы":
                    answer = self._get_client(message).get_tariff_message()
                    for i in TariffSerializer(Tariff.objects.filter(~Q(name='DefaultFree')), many=True).data:
                        self.bot.send_invoice(message.chat.id, title='Тариф',
                                     description=i['title'],
                                     provider_token=self.provider_token,
                                     currency='RUB',
                                     prices=[types.LabeledPrice(label=i['title'], amount=i['amount'])],
                                     invoice_payload=i['title'])



                else:
                    answer = ''
                    markup = self._get_menu_marktup(message)
            else:
                answer = self._get_client(message).get_tariff_message()
                markup = self._get_menu_marktup(message)
                for i in TariffSerializer(Tariff.objects.filter(~Q(name='DefaultFree')), many=True).data:
                    self.bot.send_invoice(message.chat.id, title='Тариф',
                                          description=i['title'],
                                          provider_token=self.provider_token,
                                          currency='RUB',
                                          prices=[types.LabeledPrice(label=i['title'], amount=i['amount'])],
                                          invoice_payload=i['title'])

            self.bot.send_message(message.chat.id, answer, reply_markup=markup)

        @self.bot.shipping_query_handler(func=lambda query: True)
        def shipping(shipping_query):

            self.bot.answer_shipping_query(shipping_query.id, ok=True, shipping_options=self.shipping_options,
                                      error_message='Oh, seems like our Dog couriers are having a lunch right now. Try again later!')

        @self.bot.pre_checkout_query_handler(func=lambda query: True)
        def checkout(pre_checkout_query):
            self.bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True,
                                          error_message="Aliens tried to steal your card's CVV, but we successfully protected your credentials,"
                                                        " try to pay again in a few minutes, we need a small rest.")

        @self.bot.message_handler(content_types=['successful_payment'])
        def got_payment(message):
            self.bot.send_message(message.chat.id, self._get_client(message).get_approve_pay_message())
            self._get_client(message).set_tariff(message.successful_payment.invoice_payload)

    def _get_client(self, message):
        return Client.objects.get_by_tg_id(message.from_user.id, message.from_user.username, message.chat.id)

    def _get_menu_marktup(self, message):
        markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
        if self._get_client(message).is_active():
            markup.add(types.KeyboardButton("Пары"))
        markup.add(types.KeyboardButton("Тарифы"))
        return markup

    def _client_pair(self, message):
        a = self._get_client(message).get_subscribed_timeframes()
        r = []
        for i in a:
            for j in a[i]:
                r.append(i + ' ' + j)
        return r

    @property
    def available_pair(self):
        return PairGroupSerializer(PairGroup.objects.all(),  many=True).data

    def get_available_timeframes(self, message, pair_name):
        return self._get_client(message).get_available_timeframes(pair_name)

    def send_message(self, chat_id, message_text):
        self.bot.send_message(chat_id, message_text)

    def reload(self):
        self.bot.stop_polling()
        Thread(target=self.bot.polling, kwargs={'none_stop': True, 'interval': 0}).start()

    def start_thread(self):
        Thread(target=self.bot.polling, kwargs={'none_stop': True, 'interval': 0}).start()
