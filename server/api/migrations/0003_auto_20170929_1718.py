# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 17:18
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userconfig_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userconfig',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
