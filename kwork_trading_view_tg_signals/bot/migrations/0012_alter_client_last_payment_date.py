# Generated by Django 4.0.4 on 2022-04-20 19:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0011_alter_client_last_payment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='last_payment_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 20, 22, 40, 52, 82925)),
        ),
    ]
