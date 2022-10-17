import datetime
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

import bot.models
from api.models import Signal
from bot.bot import Bot


@api_view(['GET', 'POST'])
def signal_view(request):
    try:
        pair_name = request.POST['pair']
        st_type = request.POST['type']
        timeframe = request.POST['timeframe']
    except:
        new_post = request.data
        pair_name = new_post['pair']
        st_type = new_post['type']
        timeframe = new_post['timeframe']
    datetime_in_utc = datetime.datetime.utcnow()
    signal = Signal(raw_text='{} {} {}'.format(pair_name, st_type, timeframe), received_at=datetime_in_utc)
    signal.save()
    pair_query = bot.models.PairWithTimeframe.objects.filter(pair__name=pair_name, timeframe__name=timeframe)
    if len(pair_query):
        telegram_bot = Bot(**bot.models.Bot.objects.get_bot().as_dict())
        pair = pair_query[0]
        signal.pair_with_timeframe = pair
        signal.type = st_type
        signal.save()
        for client in [i.telegram_chat_id for i in pair.clients.all()]:
            if st_type == 'BULL':
                message = bot.models.Message.objects.alert_bull_message().message_template.format(when=datetime_in_utc.strftime('%d-%m-%Y %H:%M:%S'),
                                                                                              pair=pair_name, timeframe=timeframe)
            else:
                message = bot.models.Message.objects.alert_bear_message().message_template.format(when=datetime_in_utc.strftime('%d-%m-%Y %H:%M:%S'),
                                                                    pair=pair_name, timeframe=timeframe)
            telegram_bot.send_message(client, message)
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_404_NOT_FOUND)
