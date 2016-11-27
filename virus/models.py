# -*- coding:utf-8 -*-
# ! /usr/bin/env python

"""
Model module for virus system.
"""

# History
# -------
#
# George Gao started this module.George Gao
# reformatted and documented the module and
# is currently responsible for its maintenance.
#

# Imports
# =======

from . import db
from sqlalchemy.sql import text


__version__ = "0.1"
__author__ = "GYZ"
__date__ = "2016-11-00"


# Classes for field storage
# =========================

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    username = db.Column( 'username', db.String(32), index=True, unique=True, nullable=False)
    password = db.Column('password', db.String(256), nullable=False)
    # passwd_expire = db.Column('passwd_expire',db.Boolean,default=0)
    role = db.Column('role', db.Integer, nullable=False, default=0)
    # :0 means undefine, 1 means normal user
    create_time = db.Column('create_time', db.TIMESTAMP, server_default=text('now()'))

    def __repr__(self):
        return '<User email %r>' % self.email

    def to_dict(self):
        dict = {}
        dict.update(self.__dict__)
        if "_sa_instance_state" in dict:
            del dict['_sa_instance_state']
        if "create_time" in dict:
            del dict['create_time']
        return dict


class Virus(db.Model):
    __tablename__ = 'virus'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    accesion = db.Column('accesion', db.String(32), index=True, unique=True, nullable=False)
    sample = db.Column('sample', db.String(64))
    source = db.Column('source', db.String(64), nullable=True)
    country = db.Column('country', db.String(64), nullable=True)
    isolate_t = db.Column('isolate_t', db.String(16), nullable=True)
    submit_t = db.Column('submit_t', db.String(16), nullable=True)
    reference = db.Column('reference', db.String(64), nullable=True)
    length = db.Column('length', db.String(64), nullable=True)
    orf = db.Column('orf', db.String(64), nullable=True)
    create_time = db.Column('create_time', db.TIMESTAMP, server_default=text('now()'))

    def __repr__(self):
        return '<Virus name %r>' % self.name

    def to_dict(self):
        dict = {}
        dict.update(self.__dict__)
        if "_sa_instance_state" in dict:
            del dict['_sa_instance_state']
        if "create_time" in dict:
            del dict['create_time']
        return dict


class News(db.Model):
    __tablename__ = 'news'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    news_type = db.Column('news_type', db.String(32), nullable=True)
    report_time = db.Column('report_time', db.String(32))
    title = db.Column('title', db.String(128), index=True, unique=True, nullable=False)
    location = db.Column('location', db.String(128), nullable=True)
    infect_time = db.Column('infect_time', db.String(64), nullable=True)
    infections = db.Column('infections', db.String(64), nullable=True)
    infect_people = db.Column('infect_people', db.String(64), nullable=True)
    infect_method = db.Column('infect_method', db.String(64), nullable=True)
    virus_type = db.Column('virus_type', db.String(64), nullable=True)
    web_url = db.Column('web_url', db.Text, nullable=True)
    create_time = db.Column('create_time', db.TIMESTAMP, server_default=text('now()'))

    def __repr__(self):
        return '<News title %r>' % self.title

    def to_dict(self):
        dict = {}
        dict.update(self.__dict__)
        if "_sa_instance_state" in dict:
            del dict['_sa_instance_state']
        return dict


class Paper(db.Model):
    __tablename__ = 'papers'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    host = db.Column('host', db.Integer, default=0, nullable=False)
    status = db.Column('status', db.Integer, nullable=True)
    acc_no = db.Column('acc.no', db.Integer, nullable=True)
    mol = db.Column('mol', db.String(32), nullable=True)
    org_defined = db.Column('org.defined', db.String(32), nullable=True)
    org_ncbi = db.Column('org.ncbi', db.String(32), nullable=True)
    seq_name = db.Column('seq.name', db.String(32), nullable=True)
    url = db.Column('url', db.Text, nullable=True)
    create_time = db.Column(
        'create_time',
        db.TIMESTAMP,
     server_default=text('now()'))

    def __repr__(self):
        return '<Paper seq.name %r>' % self.seq_name

    def to_dict(self):
        dict = {}
        dict.update(self.__dict__)
        if "_sa_instance_state" in dict:
            del dict['_sa_instance_state']
        return dict
