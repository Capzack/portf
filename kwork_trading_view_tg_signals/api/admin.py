from django.contrib import admin

from api.models import Signal
from bot_trview.admin_utils import OnlyChange


@admin.register(Signal)
class SignalAdmin(OnlyChange):
    readonly_fields = ('received_at', 'raw_text', 'pair_with_timeframe', 'type')
