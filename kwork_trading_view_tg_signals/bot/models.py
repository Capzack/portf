import datetime
from datetime import timedelta

import pytz
from django.db import models
from rest_framework import serializers

PERIOD_30 = timedelta(days=30)
PERIOD_YEAR = timedelta(days=365)
PERIOD_FOREVER = timedelta(weeks=10000)
utc=pytz.UTC


class TariffManager(models.Manager):

    def free_plan(self):
        return super().get_or_create(name='DefaultFree', defaults={'display_name': 'бесплатный период', 'cost': 0,
                                                                   'duration': PERIOD_30})[0]


class MessageManager(models.Manager):

    def init_defaults(self):
        self.hello_message()
        self.tariff_message()
        self.tariff_end_message()
        self.alert_bull_message()
        self.alert_bear_message()
        self.choose_pair_message()
        self.subscribe_to_pair_message()
        self.after_unsubscribed_to_pair_message()
        self.err_pay_message()
        self.approve_pay_message()
        self.go_pay_message()
        self.choose_pair_group_message()
        self.unsubscribe_to_pair_message()
        self.subscribed_pairs_message()
        self.main_menu_message()
        self.subscribed_zero_pairs_message()
        self.choose_timeframe_message()

    def hello_message(self):
        return super().get_or_create(type='HELLO_MESSAGE', defaults={'name':'Приветствие',
                                                                     'message_template':'Привет'})[0]

    def main_menu_message(self):
        return super().get_or_create(type='MAIN_MENU_MESSAGE', defaults={'name':'Сообщение после кнопки "Назад"',
                                                                         'message_template':'Выберите опцию'})[0]

    def tariff_message(self):
        return super().get_or_create(type='TARIFF_MESSAGE', defaults={'name':'Информация о тарифе', 'message_template':
                                                                      'Ваш тариф - "{tariff}", дата истечения подписки - {expire_date}',
                                                                      'needed_template_keys': 'tariff,expire_date'})[0]

    def tariff_end_message(self):
        return super().get_or_create(type='TARIFF_END_MESSAGE', defaults={'name': 'Информация о тарифе (по окончанию)',
                                                                          'message_template': 'Ваш тариф "{tariff}" закончился {expire_date}.'
                                                                                              ' Оплатите подписку, чтобы использовать бота и дальше',
                                                                          'needed_template_keys': 'tariff,expire_date'})[0]

    def subscribed_pairs_message(self):
        return super().get_or_create(type='SUBSCRIBED_PAIRS_MESSAGE', defaults={'name': 'Пары, на которые подписался клиент',
                                                                                'message_template': 'Вы подписаны на пары:\n{pairs}',
                                                                                'needed_template_keys': 'pairs'})[0]

    def subscribed_zero_pairs_message(self):
        return super().get_or_create(type='SUBSCRIBED_ZERO_PAIRS_MESSAGE', defaults={'name': 'Пары, на которые подписался клиент (при 0 парах)',
                                                                         'message_template': 'Вы не подписаны ни на одну пару'})[0]

    def unsubscribe_to_pair_message(self):
        return super().get_or_create(type='UNSUBSCRIBE_TO_PAIR_MESSAGE', defaults={'name': 'Отписаться от пары',
                                                                                   'message_template':'Выберете пару, по которой больше не нужно присылать уведомления'})[0]

    def after_unsubscribed_to_pair_message(self):
        return super().get_or_create(type='AFTER_UNSUBSCRIBED_TO_PAIR_MESSAGE', defaults={'name': 'После отписки на пару',
                                                                                          'message_template': 'Вы больше не будете получать уведомления по {pair} {timeframe}',
                                                                                          'needed_template_keys': 'pair,timeframe'})[0]

    def choose_pair_group_message(self):
        return super().get_or_create(type='CHOOSE_PAIR_GROUP_MESSAGE', defaults={'name': 'Выбор типа пары',
                                                                                 'message_template': 'Выберете тип пары'})[0]

    def choose_pair_message(self):
        return super().get_or_create(type='CHOOSE_PAIR_MESSAGE', defaults={'name': 'Выбор пары',
                                                                           'message_template': 'Выберете пару'})[0]

    def subscribe_to_pair_message(self):
        return super().get_or_create(type='SUBSCRIBE_TO_PAIR_MESSAGE', defaults={'name': 'После выбора пары',
                                                                                 'message_template': 'Вы выбрали пару - {pair} {timeframe}',
                                                                                 'needed_template_keys': 'pair,timeframe'})[0]

    def choose_timeframe_message(self):
        return super().get_or_create(type='CHOOSE_TIMEFRAME_MESSAGE', defaults={'name': 'Выбор таймфрейма',
                                                                                 'message_template': 'Выберете таймфрейм'})[0]

    def go_pay_message(self):
        return super().get_or_create(type='GO_PAY_MESSAGE', defaults={'name': 'Выбор тарифа', 'message_template':
                                                                      'Доступные тарифы:'})[0]

    def err_pay_message(self):
        return super().get_or_create(type='ERR_PAY_MESSAGE', defaults={'name': 'Ошибка при платеже', 'message_template':
                                                                       'Возникла ошибка при проведении платежа, попробуйте снова'})[0]

    def approve_pay_message(self):
        return super().get_or_create(type='APPROVE_PAY_MESSAGE', defaults={'name': 'После успешного платежа', 'message_template':
                                                                           'Оплата прошла успешна, Ваш тариф обновлен'})[0]

    def alert_bull_message(self):
        return super().get_or_create(type='ALERT_BULL_MESSAGE',
                                     defaults={'name': 'Оповещение при BULL', 'message_template':
                                               '{when} {pair} {timeframe} BULL',
                                               'needed_template_keys': 'when,pair,timeframe'})[0]

    def alert_bear_message(self):
        return super().get_or_create(type='ALERT_BEAR_MESSAGE',
                                     defaults={'name': 'Оповещение при BEAR', 'message_template':
                                               '{when} {pair} {timeframe} BEAR',
                                               'needed_template_keys': 'when,pair,timeframe'})[0]


class Tariff(models.Model):
    name = models.CharField(max_length=1000)
    display_name = models.CharField(max_length=1000)
    duration = models.DurationField(default=PERIOD_30)
    cost = models.FloatField(default=0)
    objects = TariffManager()

    def calc_expire_date(self, last_expire_date=datetime.datetime.now()):
        return last_expire_date + self.duration

    def __str__(self):
        return self.name


class PairGroup(models.Model):
    name = models.CharField(max_length=1000)
    display_name = models.CharField(max_length=1000)

    def __str__(self):
        return self.display_name


class TimeframeManager(models.Manager):

    def get_defaults(self):
        return [self._get_5(), self._get_15(), self._get_60()]

    def _get_5(self):
        return super().get_or_create(value='5M', defaults={'name': '5 минут'})[0]

    def _get_15(self):
        return super().get_or_create(value='15M', defaults={'name': '15 минут'})[0]

    def _get_60(self):
        return super().get_or_create(value='1H', defaults={'name': '1 час'})[0]


class Timeframe(models.Model):
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    objects = TimeframeManager()

    def __str__(self):
        return self.name


class Pair(models.Model):
    name = models.CharField(max_length=1000)
    display_name = models.CharField(max_length=1000)
    pair_group = models.ForeignKey(PairGroup, on_delete=models.SET_NULL, null=True, related_name='pairs')
    available_timeframes = models.ManyToManyField(Timeframe, related_name='pairs')

    def __str__(self):
        return self.display_name

    def save(self, *args, **kwargs):
        super(Pair, self).save()


class Message(models.Model):
    name = models.CharField(max_length=1000)
    type = models.CharField(max_length=1000)
    message_template = models.TextField()
    needed_template_keys = models.CharField(max_length=1000, default='')
    objects = MessageManager()

    def __str__(self):
        return self.name


class ClientManager(models.Manager):

    def get_by_tg_id(self, telegram_id, telegram_nick, chat_id):
        free_plan = Tariff.objects.free_plan()
        client = super().get_or_create(telegram_id=telegram_id, defaults={'telegram_nick': telegram_nick,
                                                                          'tariff': free_plan,
                                                                          'payment_expire_date': free_plan.calc_expire_date(),
                                                                          'telegram_chat_id': chat_id})
        if not client[1] and (client[0].telegram_id != telegram_nick or client[0].telegram_chat_id != chat_id):
            client[0].telegram_nick = telegram_nick
            client[0].telegram_chat_id = chat_id
            client[0].save()
        return client[0]


class PairWithTimeframe(models.Model):
    pair = models.ForeignKey(Pair, on_delete=models.CASCADE)
    timeframe = models.ForeignKey(Timeframe, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return '{} {}'.format(self.pair.display_name, self.timeframe.name)


class Client(models.Model):
    telegram_id = models.BigIntegerField()
    telegram_nick = models.CharField(max_length=1000, null=True)
    telegram_chat_id = models.CharField(max_length=1000, null=True)
    tariff = models.ForeignKey(Tariff, on_delete=models.SET_NULL, null=True)
    last_payment_date = models.DateTimeField(default=datetime.datetime.now())
    payment_expire_date = models.DateTimeField(null=True)
    pairs = models.ManyToManyField(PairWithTimeframe, related_name='clients')
    objects = ClientManager()

    def subscribe_to_pair(self, pair_name, timeframe=None):
        pair_query = Pair.objects.filter(display_name=pair_name)
        timeframe_query = Timeframe.objects.filter(name=timeframe) if timeframe is not None else Timeframe.objects.all()
        if len(pair_query) > 0 and len(timeframe_query) > 0:
            for i in timeframe_query:
                pair_with_timeframe = PairWithTimeframe.objects.get_or_create(pair=pair_query[0], timeframe=i)[0]
                self.pairs.add(pair_with_timeframe)
        self.save()

    def unsubscribe_to_pair(self, pair_name, timeframe=None):
        kwargs = {'pair__display_name': pair_name}
        if timeframe is not None: kwargs['timeframe__name'] = timeframe
        self.pairs.remove(*PairWithTimeframe.objects.filter(**kwargs))
        self.save()

    def set_tariff(self, tariff_name):
        tariff_query = Tariff.objects.filter(display_name=tariff_name)
        if len(tariff_query) > 0:
            self.tariff = tariff_query[0]
            self.last_payment_date = datetime.datetime.now()
            self.payment_expire_date = self.tariff.calc_expire_date(self.payment_expire_date
                                                                    if self.last_payment_date.replace(tzinfo=utc) < self.payment_expire_date.replace(tzinfo=utc)
                                                                    else self.payment_expire_date)
        self.save(update_fields=('tariff', 'payment_expire_date', 'last_payment_date'))

    def is_active(self):
        if datetime.datetime.now().replace(tzinfo=utc) <= self.payment_expire_date.replace(tzinfo=utc): return True

    def get_pairs(self):
        return self.pairs.all()

    def get_hello_message(self):
        return Message.objects.hello_message().message_template

    def get_tariff_message(self):
        if self.is_active(): message_template = Message.objects.tariff_message().message_template
        else: message_template = Message.objects.tariff_end_message().message_template
        return message_template.format(tariff=self.tariff.display_name, expire_date=self.payment_expire_date.strftime('%H:%M %d-%m-%Y'))

    def get_subscribed_pairs_message(self):
        pairs = set([i.pair for i in self.get_pairs()])
        if len(pairs) > 0: return Message.objects.subscribed_pairs_message().message_template.format(pairs='\n'.join(PairSerializer(pairs, many=True).data))
        else: return Message.objects.subscribed_zero_pairs_message().message_template

    def get_unsubscribe_to_pair_message(self):
        return Message.objects.unsubscribe_to_pair_message().message_template

    def get_after_unsubscribed_to_pair_message(self, pair_name, timeframe):
        return Message.objects.after_unsubscribed_to_pair_message().message_template.format(pair=pair_name, timeframe=timeframe)

    def get_choose_pair_group_message(self):
        return Message.objects.choose_pair_group_message().message_template

    def get_choose_pair_message(self):
        return Message.objects.choose_pair_message().message_template

    def get_choose_timeframe_message(self):
        return Message.objects.choose_timeframe_message().message_template

    def get_subscribe_to_pair_message(self, pair_name, timeframe):
        return Message.objects.subscribe_to_pair_message().message_template.format(pair=pair_name, timeframe=timeframe)

    def get_go_pay_message(self):
        return Message.objects.go_pay_message().message_template

    def get_approve_pay_message(self, context=None):
        return Message.objects.approve_pay_message().message_template.format(context)

    def get_err_pay_message(self, context=None):
        return Message.objects.err_pay_message().message_template.format(context)

    def get_menu_message(self):
        return Message.objects.main_menu_message().message_template

    def get_available_timeframes(self, pair_name):
        return [i.name for i in Pair.objects.filter(display_name=pair_name)[0].available_timeframes.all()]

    def get_subscribed_timeframes(self):
        pairs = PairSerializer([i.pair for i in self.get_pairs()], many=True).data
        print(pairs)
        return {i: [j.timeframe.name for j in self.get_pairs().filter(pair__display_name=i)] for i in pairs}

    def __str__(self):
        return self.telegram_nick


class BotManager(models.Manager):

    def get_bot(self):
        if len(super().all()) == 0:
            return super().create(token='1762689119:AAECGEuk21ZGEvYGZwRYhaXXXoLrXZsgCSE', provider_token='381764678:TEST:36123')
        else: return super().all()[0]


class Bot(models.Model):
    token = models.CharField(max_length=300, null=True, default=None)
    provider_token = models.CharField(max_length=300, null=True, default=None)
    objects = BotManager()

    def as_dict(self):
        return {'token': self.token, 'provider_token': self.provider_token}

    def __str__(self):
        return 'Bot'


class ManySerializer(serializers.ListSerializer):

    def to_representation(self, data):
        iterable = data.all() if isinstance(data, models.Manager) else data
        return [self.child.__class__(i).data for i in iterable]


class PairSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pair
        fields = ['display_name']
        list_serializer_class = ManySerializer

    @property
    def data(self):
        return super().data['display_name']


class PairGroupSerializer(serializers.ModelSerializer):
    view = serializers.CharField(source='display_name', read_only=True)
    pairs = serializers.SerializerMethodField()

    class Meta:
        model = PairGroup
        fields = ['view', 'pairs']
        list_serializer_class = ManySerializer

    @classmethod
    def get_pairs(cls, obj):
        return PairSerializer(obj.pairs.all(), many=True).data


class TariffSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='display_name')
    amount = serializers.SerializerMethodField()

    class Meta:
        model = Tariff
        fields = ['title', 'amount']
        list_serializer_class = ManySerializer

    @classmethod
    def get_amount(cls, obj):
        return int(obj.cost * 100)
