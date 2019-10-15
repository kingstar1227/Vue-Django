from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from api.models import Record
from api.models import UserConfig
from api.permissions import IsUserManageAllowed
from api.serializers import RecordSerializer
from api.serializers import RecordWithUserSerializer
from api.serializers import UserSerializer
from api.serializers import UserCreateSerializer
from api.serializers import UserUpdateSerializer
from api.serializers import UserConfigSerializer


class RecordViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.request.user.userconfig.user_role == UserConfig.USER_ROLE_ADMIN:
            return RecordWithUserSerializer
        else:
            return RecordSerializer

    def get_queryset(self):
        qs = Record.objects.select_related('user')
        if self.request.user.userconfig.user_role == UserConfig.USER_ROLE_ADMIN:
            qs = qs.all()
        else:
            qs = qs.filter(user=self.request.user)

        start_date = self.request.query_params.get('start_date', None)
        if start_date:
            qs = qs.filter(date__gte=start_date)
        end_date = self.request.query_params.get('end_date', None)
        if end_date:
            qs = qs.filter(date__lte=end_date)
        start_time = self.request.query_params.get('start_time', None)
        if start_time:
            qs = qs.filter(time__gte=start_time)
        end_time = self.request.query_params.get('end_time', None)
        if end_time:
            qs = qs.filter(time__lte=end_time)

        return qs.order_by('date')

    def recalculate_exceed_flag(self, date):
        affected_records = Record.objects.filter(
            user=self.request.user,
            date=date
        )
        Record.recalculate_exceed_flag(affected_records)

    def perform_create(self, serializer):
        record = serializer.save()
        record.user = self.request.user
        record.save()
        self.recalculate_exceed_flag(record.date)

    def perform_update(self, serializer):
        record = serializer.save()
        self.recalculate_exceed_flag(record.date)

    def perform_destroy(self, instance):
        date = instance.date
        instance.delete()
        self.recalculate_exceed_flag(date)


class SignupView(views.APIView):
    authentication_classes = ()
    permission_classes = ()

    def post(self, *args, **kwargs):
        user_data = self.request.data
        user_data['user_role'] = UserConfig.USER_ROLE_NORMAL
        serializer = UserCreateSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = get_user_model().objects.create_user(
            serializer.data['username'],
            serializer.data['email'],
            serializer.data['password']
        )
        user_config = UserConfig.objects.create(
            user=user
        )
        return Response({
            'success': True
        })


class UserViewSet(viewsets.GenericViewSet):
    permission_classes = (IsUserManageAllowed,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return get_user_model().objects.select_related(
            'userconfig'
        ).filter(
            userconfig__user_role__lte=self.request.user.userconfig.user_role
        ).order_by('id')

    def list(self, request):
        serializer = UserSerializer(
            self.paginate_queryset(self.get_queryset()),
            many=True
        )
        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        user = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = UserSerializer(instance=user)
        return Response(serializer.data)

    def create(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if self.request.user.userconfig.user_role < int(serializer.data['user_role']):
            raise ParseError('Operation not allowed')
        user = get_user_model().objects.create_user(
            serializer.data['username'],
            serializer.data['email'],
            serializer.data['password']
        )
        UserConfig.objects.create(
            user_role=int(serializer.data['user_role']),
            user=user
        )
        return Response(serializer.data)

    def update(self, request, pk=None):
        user = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = UserUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if self.request.user.userconfig.user_role < int(serializer.data['user_role']):
            raise ParseError('Operation not allowed')
        user.username = serializer.data['username']
        user.email = serializer.data['email']
        user.save()
        user.userconfig.user_role = int(serializer.data['user_role'])
        user.userconfig.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        if self.request.user.pk == int(pk or 0):
            raise ParseError('Cannot delete your own user account')
        get_object_or_404(self.get_queryset(), pk=pk).delete()
        return Response({ 'success': True })


class UserConfigView(views.APIView):
    def get(self, *args, **kwargs):
        serializer = UserConfigSerializer(self.request.user.userconfig)
        return Response(serializer.data)

    def put(self, *args, **kwargs):
        serializer = UserConfigSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)

        self.request.user.userconfig.expected_calories_per_day = serializer.data['expected_calories_per_day']
        self.request.user.userconfig.save()

        affected_records = Record.objects.filter(
            user=self.request.user
        )
        Record.recalculate_exceed_flag(affected_records)

        return Response({
            'success': True
        })
