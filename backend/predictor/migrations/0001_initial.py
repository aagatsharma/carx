# Generated by Django 5.1.5 on 2025-01-29 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_name', models.CharField(max_length=100)),
                ('brand', models.CharField(max_length=50)),
                ('model', models.CharField(max_length=50)),
                ('vehicle_age', models.IntegerField()),
                ('km_driven', models.IntegerField()),
                ('seller_type', models.CharField(max_length=20)),
                ('fuel_type', models.CharField(max_length=20)),
                ('transmission_type', models.CharField(max_length=20)),
                ('mileage', models.FloatField()),
                ('engine', models.IntegerField()),
                ('max_power', models.FloatField()),
                ('seats', models.IntegerField()),
                ('user_price', models.FloatField(blank=True, null=True)),
                ('predicted_price', models.FloatField(blank=True, null=True)),
            ],
        ),
    ]
