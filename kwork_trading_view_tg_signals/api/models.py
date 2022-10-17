import datetime

from django.db import models

from bot.models import PairWithTimeframe


class Signal(models.Model):
    received_at = models.DateTimeField(default=datetime.datetime.utcnow())
    raw_text = models.TextField(default='')
    pair_with_timeframe = models.ForeignKey(PairWithTimeframe, on_delete=models.SET_NULL, null=True)
    type = models.CharField(choices=(('BULL', 'BULL'), ('BEAR', 'BEAR')), max_length=10, null=True)
