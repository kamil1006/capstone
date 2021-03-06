# Generated by Django 3.2.4 on 2021-09-26 12:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0011_myfreedays'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField(default=2022)),
                ('status', models.CharField(default='planning', max_length=25)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_c', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
