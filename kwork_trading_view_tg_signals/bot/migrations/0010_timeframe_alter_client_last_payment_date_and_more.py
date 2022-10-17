# Generated by Django 4.0.4 on 2022-04-20 19:03

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0009_alter_client_last_payment_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Timeframe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('value', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='client',
            name='last_payment_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 20, 22, 3, 14, 264587)),
        ),
        migrations.CreateModel(
            name='PairWithTimeframe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pair', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bot.pair')),
                ('timeframe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='bot.timeframe')),
            ],
        ),
        migrations.AddField(
            model_name='pair',
            name='available_timeframes',
            field=models.ManyToManyField(related_name='pairs', to='bot.timeframe'),
        ),
        migrations.AlterField(
            model_name='client',
            name='pairs',
            field=models.ManyToManyField(related_name='clients', to='bot.pairwithtimeframe'),
        ),
    ]
