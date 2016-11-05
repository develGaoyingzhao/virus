# -*- coding:utf-8 -*-
# !/usr/bin/env  python

"""
View module for Virus system.
"""

# Imports
# =======

import hashlib
import time
from sqlalchemy.sql import text
import datetime
from flask import request, g, url_for, redirect, current_app, send_from_directory
from . import main
from .. import db, redis_store
from ..models import User, Virus, News, Paper
from tools import resq_wrapper as rw, gen_random_password, gen_password_hash
from info import logger
from wrap import login_check, inner_role_check, normal_role_check, request_info
import constant as cs

# History
# -------
#
# George Gao started this module.The multipart
# parsing was inspired by code submitted by Gao.
# George Gao reformatted and documented the
# module and is currently responsible for its
# maintenance.
#

__version__ = "0.5"
__author__ = "GYZ"
__date__ = "2016-11-03"


# Request Functions
# =================
@main.before_request
def before_request():
    token = request.values.get('token')
    email = redis_store.get('token:%s' % token)
    if email:
        g.current_user = User.query.filter_by(email=email).first()
        redis_store.expire('token:%s' % token, current_app.config['TOKEN_EXPIRE'])
        redis_store.expire('token_set:%s' % email, current_app.config['TOKEN_EXPIRE'])
    return


@main.teardown_request
def handle_teardown_request(exception):
    db.session.remove()
# Route for url function
# ======================


@main.route('/upload/<path:path>')
@request_info
def send_file(path):
    return send_from_directory('upload', path)


@main.route('/')
@request_info
def index():
    return redirect(url_for('.index', _external=True) +
                    current_app.config['FRONT_URL'] + 'login.html')

# User actions
# ============
@main.route('/users', methods=['POST'])
@request_info
def register():
    '''
    C001 - register api
    '''
    u = User()
    u.username = request.json.get('username')
    user = User.query.filter_by(username=u.username).first()
    if user:
        return rw(cs.REGISTERED)
    password = request.json.get('password')
    u.password = gen_password_hash(u.username, password)
    db.session.add(u)
    db.session.commit()
    return rw(cs.OK)

@main.route('/login', methods=['POST'])
@request_info
def login():
    '''
    C002 - login api
    '''

    print request.get_data()
    #import pdb; pdb.set_trace()
    username = request.json.get('username')
    user = User.query.filter_by(username=username).first()

    if not user:
        return rw(cs.NO_USER)

    password = request.json.get('password')

    password = gen_password_hash(username, password)

    if user.password != password:
        return rw(cs.LOGIN_FAIL)

    m = hashlib.md5()
    m.update(username)
    m.update(password)
    m.update(str(int(time.time())))
    token = m.hexdigest()

    redis_store.sadd('token_set:%s' % username, token)
    redis_store.expire('token_set:%s' % username, current_app.config['TOKEN_EXPIRE'])

    redis_store.hmset(
            'user:%s' % user.username, {
                    'token': token, 'temp': 0})
    redis_store.set('token:%s' % token, user.username)
    redis_store.expire('token:%s' % token, current_app.config['TOKEN_EXPIRE'])

    return rw(cs.OK, {'token':token})


@main.route('/logout', methods=['POST'])
@request_info
@login_check
def logout():
    '''
    C003 - logout api
    '''

    user = g.current_user
    token = request.json.get('token')
    redis_store.delete('token:%s' % token)
    redis_store.hmset('user:%s' % user.email, {'app_online': 0})
    return rw(cs.OK)


@main.route('/virus', methods=['GET'])
# @login_check
@request_info
def list_all_virus():
    '''
    C005 - list all virus information.
    '''

    key = request.values.get('key')
    data = request.values.get('data')
    #gene_type = request.values.get('gene_type')
    #source_type = request.values.get('source_type')
    #location = request.values.get('location')
    #time = request.values.get('time')
    statement = '%s=%s' % (key, data)
    virus_objs = Virus.query.filter(text(statement)).all()
    send = [item.to_dict() for item in virus_objs]
    return rw(cs.OK, send)


@main.route('/virus/<id>')
# @login_check
@request_info
def get_one_virus():
    '''
    C005 - get one virus information.
    '''

    virus_obj = Virus.query.filter_by(id=id).first()
    return rw(cs.OK, virus_obj.to_dict)


@main.route('/news', methods=['GET'])
# @login_check
@request_info
def list_all_news():
    '''
    C005 - list all news information.
    '''

    page_size = request.values.get('page_size')
    page_index = request.values.get('page_index')
    news_objs = News.query.order_by(db.desc(News.create_time)).paginate(int(page_index), int(page_size), False)
    count = News.query.count()
    if not count:
        return rw(cs.OK)

    send = []
    # for item in commits:
    for item in news_objs.items:
        dic = item.to_dict()
        send.append(dic)
    return rw(cs.OK, send)

@main.route('/papers', methods=['GET'])
# @login_check
@request_info
def list_all_paper():
    '''
    C005 - list all papers information.
    '''

    page_size = request.values.get('page_size')
    page_index = request.values.get('page_index')
    paper_objs = Paper.query.order_by(db.desc(Paper.create_time)).paginate(int(page_index), int(page_size), False)
    count = Paper.query.count()
    if not count:
        return rw(cs.OK)

    send = []
    # for item in commits:
    for item in paper_objs.items:
        dic = item.to_dict()
        send.append(dic)
    return rw(cs.OK, send)
