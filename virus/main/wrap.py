# -*- coding:utf-8 -*-

from functools import wraps
from flask import request, g, current_app
from info import logger
from tools import resq_wrapper as rw
import constant as cs
from .. import redis_store


def login_check(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = request.values.get('token')
        if not token:
            return rw(cs.NO_TOKEN)
        email = redis_store.get('token:%s' % token)
        # single login
        # if not email or token != redis_store.hget('user:%s' % email, 'token'):
        if not email:
            return rw(cs.TOKEN_EXPIRE)
        if redis_store.hget('user:%s' % email, 'temp') == 1:
            return rw(cs.TEMP_TOKEN)
        return f(*args, **kwargs)
    return decorator


def inner_role_check(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        user = g.current_user
        role = user.role
        logger.info('client: %s, path: %s, method: %s'  % (request.remote_addr, request.path, request.method))
        if role != 1:
            return rw(cs.NOT_ALLOW)
        return f(*args, **kwargs)
    return decorator


def normal_role_check(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        user = g.current_user
        role = user.role
        if role != 0:
            return rw(cs.NOT_ALLOW)
        return f(*args, **kwargs)
    return decorator


def request_info(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        info = ' '.join(['path:', request.path, 'method:', request.method])
        logger.info('%s', info)
        request_info = ' '.join(['path:', request.path, request.method, str(request.values)])
        logger.info('Request: %s', request_info)
        func_return = f(*args, **kwargs)
        response_info = ' '.join(['path:', request.path, request.method, str(vars(func_return))])
        if request.method == 'POST':
            logger.info('Response:%s', response_info)
        else:
            logger.debug('Response:%s', response_info)
        return func_return
    return decorator
