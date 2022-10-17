# Generated by Django 4.0.4 on 2022-04-21 15:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0012_alter_client_last_payment_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='needed_template_keys',
            field=models.CharField(default='', max_length=1000),
        ),
        migrations.AlterField(
            model_name='client',
            name='last_payment_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 21, 18, 24, 6, 250699)),
        ),
    ]
