from django.conf import settings
from django.db import models
from django.db.models import Sum


class Record(models.Model):
    date = models.DateField(null=False)
    time = models.TimeField(null=False)
    text = models.CharField(max_length=300, null=False, blank=False)
    calories = models.IntegerField(null=False)
    exceeds_day_calories = models.BooleanField(null=False, default=False)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)

    def __str__(self):
        return u'{} at {} {}'.format(
            self.text,
            self.date,
            self.time
        )

    @classmethod
    def recalculate_exceed_flag(cls, record_queryset):
        calculated_dates = []
        for record in record_queryset:
            try:
                calculated_dates.index(record.date)
            except ValueError:
                calculated_dates.append(record.date)

                day_records = Record.objects.filter(
                    user=record.user,
                    date=record.date
                )
                sum_record = day_records.aggregate(day_calories=Sum('calories'))
                day_calories = sum_record['day_calories']

                user_config = record.user.userconfig
                exceeds = (day_calories >= user_config.expected_calories_per_day)
                day_records.update(exceeds_day_calories=exceeds)


class UserConfig(models.Model):
    USER_ROLE_NORMAL = 0
    USER_ROLE_MANAGER = 1
    USER_ROLE_ADMIN = 2
    USER_ROLE_CHOICES = (
        (USER_ROLE_NORMAL, 'Normal User'),
        (USER_ROLE_MANAGER, 'User Manager'),
        (USER_ROLE_ADMIN, 'Admin'),
    )

    expected_calories_per_day = models.IntegerField(default=3000, null=False)
    user_role = models.IntegerField(choices=USER_ROLE_CHOICES, default=0)

    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True)

    def __str__(self):
        return u'User config of {}'.format(self.user.username)
