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
import sqlalchemy.exc
import datetime
from flask import request, g, url_for, redirect, current_app, send_from_directory, Response
from . import main
from .. import db, redis_store
from ..models import User, Virus, News, Paper
from tools import resq_wrapper as rw, gen_random_password, gen_password_hash
from info import logger
from request_response import request_data
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
    if request.method == 'OPTIONS':
        headers = {"Access-Control-Allow-Origin": "*",
                                     "Access-Control-Allow-Headers":
                                     "Origin, X-Requested-With, Content-Type, Accept, X-ID, X-TOKEN, X-ANY-YOUR-CUSTOM-HEADER",
                                     "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"}
        return Response(status=200, mimetype='application/json', headers=headers)
    if request.method == 'GET':
        token = request.values.get('token')
    else:
        token = request.json.get('token')
    username = redis_store.get('token:%s' % token)
    if username:
        g.current_user = User.query.filter_by(username=username).first()
        redis_store.expire('token:%s' % token, current_app.config['TOKEN_EXPIRE'])
        redis_store.expire('token_set:%s' % username, current_app.config['TOKEN_EXPIRE'])
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

    return rw(cs.OK, {'token':token, 'role':user.role})


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
    redis_store.hmset('user:%s' % user.username, {'app_online': 0})
    return rw(cs.OK)


@main.route('/virus', methods=['POST'])
@request_info
def insert_virus():
    '''
    C001 - insert virus api
    '''
    v = Virus()
    input_data = request_data()
    if 'id' in input_data:
        del input_data['id']
    for item in input_data.keys():
        setattr(v, str(item), input_data[item])
    # v.name = request.json.get('name')
    # v.serial_number = request.json.get('serial_number')
    # v.gene_type = request.json.get('gene_type')
    # v.location = request.json.get('location')
    # v.time = request.json.get('time')
    # v.source = request.json.get('source')
    # v.sequence_length = request.json.get('sequence_length')
    # virus_obj = Virus.query.filter_by(serial_number=v.serial_number).first()
    # if virus_obj:
    #     return rw(cs.SAME_COMMIT)
    try:
        db.session.add(v)
        db.session.commit()
    except sqlalchemy.exc.IntegrityError:
        db.session.rollback()
        logger.debug('Db Exception: %s', (e))
        return rw(cs.SAME_COMMIT)
    return rw(cs.OK)

@main.route('/news', methods=['POST'])
@request_info
def insert_news():
    '''
    C001 - insert news api
    '''
    # import pdb; pdb.set_trace()  # XXX BREAKPOINT
    n = News()
    input_data = request_data()
    if 'id' in input_data:
        del input_data['id']
    for item in input_data.keys():
        setattr(n, str(item), input_data[item])
    try:
        db.session.add(n)
        db.session.commit()
    except sqlalchemy.exc.IntegrityError,e:
        db.session.rollback()
        logger.debug('Db Exception: %s', (e))
        return rw(cs.SAME_COMMIT)
    return rw(cs.OK)


@main.route('/virus', methods=['GET'])
# @login_check
@request_info
def list_all_virus():
    '''
    C005 - list all virus information.
    '''

    # orf = request.values.get('orf')
    # accesion = request.values.get('accesion')
    # country = request.values.get('country')
    # isolate_t = request.values.get('isolate_t')
    input_data = request_data()
    page_size = input_data.get('page_size')
    page_index = input_data.get('page_index')
    # import pdb; pdb.set_trace()  # XXX BREAKPOINT
    keys = input_data.keys()
    if "token" in keys:
        keys.remove('token')
    if "page_size" in keys:
        keys.remove('page_size')
    if "page_index" in keys:
        keys.remove('page_index')
    if not keys:
        virus_objs = Virus.query.paginate(int(page_index), int(page_size), False)
        count = Virus.query.count()
    elif len(keys) == 1:
        statement = "%s='%s'" % (keys[0],input_data[keys[0]])
        count = Virus.query.filter(text(statement)).count()
        virus_objs = Virus.query.filter(text(statement)).paginate(int(page_index), int(page_size), False)
    else:
        statement = ' and '.join(["%s='%s'" % (item, input_data[item]) for item in keys])
        virus_objs = Virus.query.filter(text(statement)).paginate(int(page_index), int(page_size), False)
        count = Virus.query.filter(text(statement)).count()
    send = [item.to_dict() for item in virus_objs.items]
    dic = { 'count': count, 'virus': send}
    return rw(cs.OK, dic)


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

    input_data = request_data()
    page_size = input_data.get('page_size')
    page_index = input_data.get('page_index')
    # import pdb; pdb.set_trace()  # XXX BREAKPOINT
    keys = input_data.keys()
    if "token" in keys:
        keys.remove('token')
    if "page_size" in keys:
        keys.remove('page_size')
    if "page_index" in keys:
        keys.remove('page_index')
    if not keys:
        news_objs = News.query.paginate(int(page_index), int(page_size), False)
        count = News.query.count()
    elif len(keys) == 1:
        statement = "%s='%s'" % (keys[0],input_data[keys[0]])
        count = News.query.filter(text(statement)).count()
        news_objs = News.query.filter(text(statement)).paginate(int(page_index), int(page_size), False)
    else:
        statement = ' and '.join(["%s='%s'" % (item, input_data[item]) for item in keys])
        news_objs = News.query.filter(text(statement)).paginate(int(page_index), int(page_size), False)
        count = News.query.filter(text(statement)).count()
    send = [item.to_dict() for item in news_objs.items]
    dic = { 'count': count, 'news': send}
    return rw(cs.OK, dic)


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
