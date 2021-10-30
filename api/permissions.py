from rest_framework import permissions


class IsPostOrIsGetOrIsAuthenticated(permissions.BasePermission):
    """
    Allow unrestricted post and get, require authentication for rest of the methods.
    """
    SAFE_METHODS = ['POST', 'GET']

    def has_permission(self, request, view):
        if request.method in self.SAFE_METHODS:
            return True

        return request.user and request.user.is_authenticated


class IsPostOrIsAuthenticated(permissions.BasePermission):
    """
    Allow unrestricted post, require authentication for rest of the methods.
    """
    SAFE_METHODS = ['POST']

    def has_permission(self, request, view):
        if request.method in self.SAFE_METHODS:
            return True

        return request.user and request.user.is_authenticated
