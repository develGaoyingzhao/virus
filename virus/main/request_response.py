# -*- coding:utf-8 -*-

from flask import request, jsonify

def request_data():
    if request.method in ('POST', 'PUT'):
        if hasattr(request, 'json') and request.json:
            return request.json
        else:
            return request.values
    else:
        return request.values
