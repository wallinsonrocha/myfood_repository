from rest_framework import permissions
from rolepermissions.checkers import has_role

SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')
CLIENT_METHODS = ('DELETE', 'POST', 'GET', 'HEAD', 'OPTIONS')


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
        if request.user.is_authenticated and request.method in CLIENT_METHODS:
            return obj.user == request.user
        return False

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.method in CLIENT_METHODS
