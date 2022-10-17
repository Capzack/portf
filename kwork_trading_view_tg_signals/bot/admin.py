from django.contrib import admin, messages
from django.core.exceptions import ValidationError
from django.forms import ModelForm

from django.http import HttpResponseRedirect

import bot.bot
from .models import Client, Message, Bot, PairGroup, Pair, Tariff, Timeframe
from bot_trview.admin_utils import OnlyChange


class MessageAdminForm(ModelForm):

    class Meta:
        model = Message
        fields = ('message_template',)

    def clean_message_template(self):
        for i in self.instance.needed_template_keys.split(','):
            if i != '' and '{' + i + '}' not in self.cleaned_data.get('message_template'):
                raise ValidationError('Шаблон должен включать в себя плейсхолдеры: %(value)s', params={'value': self.instance.needed_template_keys}, code='invalid', )
        return self.cleaned_data.get('message_template')


@admin.register(Message)
class MessageAdmin(OnlyChange):
    form = MessageAdminForm



@admin.register(Client)
class ClientAdmin(OnlyChange):
    readonly_fields = ('telegram_id', 'telegram_nick', 'last_payment_date', 'telegram_chat_id')
    list_filter = ('last_payment_date', 'payment_expire_date', 'tariff', 'telegram_nick')


@admin.register(Bot)
class BotAdmin(OnlyChange):
    change_form_template = "bot_template.html"

    def response_change(self, request, obj):
        if "_reload_bot" in request.POST:
            self.message_user(request, "Бот будет перезагружен")
            bot.bot.Bot(**Bot.objects.get_bot().as_dict()).reload()
            return HttpResponseRedirect(".")
        return super().response_change(request, obj)


@admin.register(Tariff)
class TariffAdmin(admin.ModelAdmin):
    list_filter = ('cost', 'duration')


@admin.register(PairGroup)
class PairGroupAdmin(admin.ModelAdmin):
    pass


@admin.register(Pair)
class PairAdmin(admin.ModelAdmin):
    list_filter = ('pair_group', )


@admin.register(Timeframe)
class TimeframeAdmin(admin.ModelAdmin):
    pass

# Register your models here.
