from rest_framework.permissions import BasePermission

from api.models import UserConfig


class IsUserManageAllowed(BasePermission):
    def has_permission(self, request, view):
        try:
            return request.user.userconfig.user_role >= UserConfig.USER_ROLE_MANAGER
        except:
            return False
