# -*- coding: utf-8 -*-

import datetime
import hashlib
from flask import current_app, jsonify
import string

import constant as cs


headers = {"Access-Control-Allow-Origin": "*",
                              "Access-Control-Allow-Headers":
                              "Origin, X-Requested-With, Content-Type, Accept, X-ID, X-TOKEN, X-ANY-YOUR-CUSTOM-HEADER",
                              "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"}
def resq_wrapper(code,rval=None):
    return jsonify({'code':code,'msg':cs.ERR_MSG[code],'data':rval})


def gen_random_password(length=8,chars=string.ascii_letters+string.digits):
    return ''.join([choice(chars) for i in range(length)])

def gen_password_hash(email, password):
    m = hashlib.md5()
    m.update(email)
    m.update(password)
    password_hash = m.hexdigest()
    return password_hash

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in \
           current_app.config['ALLOWED_EXTENSIONS']
