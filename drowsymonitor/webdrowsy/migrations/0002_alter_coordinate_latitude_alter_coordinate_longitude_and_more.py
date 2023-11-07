# Generated by Django 4.2.7 on 2023-11-07 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webdrowsy', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coordinate',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name='coordinate',
            name='longitude',
            field=models.DecimalField(decimal_places=7, max_digits=10),
        ),
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
