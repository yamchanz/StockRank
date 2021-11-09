import jwt
from stockrank.settings import SECRET_KEY
from .models import Users


def get_userlogin(auth_token: str):
    if auth_token is None:
        return None

    # extract token, token format "JWT <token>"
    auth_token = auth_token.split(' ')
    if len(auth_token) != 2:
        return None
    return jwt.decode(auth_token[1], SECRET_KEY, 'HS256')['user_id']


def get_current_user(auth_token):
    userlogin = get_userlogin(auth_token)
    if userlogin is None:
        return None

    user = Users.objects.raw("SELECT * FROM Users WHERE UserLogin=%s", [
        userlogin
    ])

    if len(user) != 1:
        return None

    return user[0]
