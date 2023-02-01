from rest_framework import permissions
from rolepermissions.checkers import has_role

from users.models import UserFood

SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')

class IsGerente(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(
            request.method in SAFE_METHODS or
            has_role(request.user, 'gerente')
        )

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            has_role(request.user, 'gerente')
        )


class IsClient(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return has_role(request.user, 'client')

    def has_permission(self, request, view):
        return has_role(request.user, 'client')
