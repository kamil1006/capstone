# Generated by Django 3.2.4 on 2021-09-26 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0012_mystatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='mystatus',
            name='info',
            field=models.CharField(default='please fill', max_length=255),
        ),
    ]
