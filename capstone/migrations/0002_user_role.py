# Generated by Django 3.2.4 on 2021-09-18 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(default='employee', max_length=25),
        ),
    ]
