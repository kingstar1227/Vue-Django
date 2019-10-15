from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter
from rest_framework_jwt.views import obtain_jwt_token

from api.views import RecordViewSet
from api.views import SignupView
from api.views import UserViewSet
from api.views import UserConfigView


router = SimpleRouter()
router.register('records', RecordViewSet, 'record')
router.register('users', UserViewSet, 'user')

urlpatterns = [
    url('login/', obtain_jwt_token),
    url('signup/', SignupView.as_view()),
    url('userconfig/', UserConfigView.as_view()),
    url(r'^', include(router.urls)),
]
