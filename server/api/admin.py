from django.contrib import admin

from api.models import Record
from api.models import UserConfig


admin.site.register(Record)
admin.site.register(UserConfig)
