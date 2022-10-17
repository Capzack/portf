import sys

from django.apps import AppConfig


class BotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bot'

    def ready(self):
        if 'runserver' not in sys.argv:
            return True
        from . import models
        from .bot import Bot
        models.Message.objects.init_defaults()
        models.Timeframe.objects.get_defaults()
        models.Tariff.objects.free_plan()
        Bot(**models.Bot.objects.get_bot().as_dict()).start_thread()
