from django.contrib.auth import get_user_model

from rest_framework import serializers

from api.models import Record
from api.models import UserConfig


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', 'date', 'time', 'text', 'calories', 'exceeds_day_calories')
        read_only_fields = ('exceeds_day_calories',)


class RecordWithUserSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, record):
        return record.user.username

    class Meta:
        model = Record
        fields = ('id', 'date', 'time', 'text', 'calories', 'exceeds_day_calories', 'user')
        read_only_fields = ('exceeds_day_calories',)


class UserConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConfig
        fields = ('expected_calories_per_day', 'user_role')
        read_only_fields = ('user_role',)


class UserSerializer(serializers.ModelSerializer):
    user_role = serializers.SerializerMethodField()

    def get_user_role(self, user):
        return user.userconfig.user_role

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'user_role')
        read_only_fields = ('id', 'username', 'email', 'user_role')


class UserUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    user_role = serializers.ChoiceField(choices=UserConfig.USER_ROLE_CHOICES, required=True)


class UserCreateSerializer(UserUpdateSerializer):
    password = serializers.CharField(min_length=6, required=True)
    password_confirm = serializers.CharField(min_length=6, required=True)

    def validate(self, data):
        data = super(UserCreateSerializer, self).validate(data)
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError('Password confirmation does not match')
        return data
