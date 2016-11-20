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
    username = db.Column(
        'username',
        db.String(32),
        index=True,
        unique=True,
     nullable=False)
    password = db.Column('password', db.String(256), nullable=False)
    # passwd_expire = db.Column('passwd_expire',db.Boolean,default=0)
    role = db.Column('role', db.Integer, nullable=False, default=0)
    # :0 means undefine, 1 means normal user
    create_time = db.Column(
        'create_time',
        db.TIMESTAMP,
     server_default=text('now()'))

    def __repr__(self):
        return '<User email %r>' % self.email

    def to_dict(self):
        dict = {}
        dict.update(self.__dict__)
        if "_sa_instance_state" in dict:
            del dict['_sa_instance_state']
        return dict


class Virus(db.Model):
    __tablename__ = 'virus'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('name', db.String(32), nullable=False)
    serial_number = db.Column(
        'serial_number', db.String(32),
        index=True, unique=True, nullable=False)
    gene_type = db.Column('gene_type', db.String(16), nullable=True)
    location = db.Column('location', db.String(32), nullable=True)
    time = db.Column('time', db.Integer, nullable=True)
    source = db.Column('source', db.String(32), nullable=True)
    sequence_length = db.Column('sequence_length', db.Integer, nullable=True)
    create_time = db.Column(
        'create_time',
        db.TIMESTAMP,
     server_default=text('now()'))

    def __repr__(self):
        return '<Virus name %r>' % self.name

    def to_dict(self):
        dict = {}
        dict.update(self.__dict__)
        if "_sa_instance_state" in dict:
            del dict['_sa_instance_state']
        return dict


class News(db.Model):
    __tablename__ = 'news'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    news_type = db.Column('news_type', db.String(32), default=0, nullable=False)
    report_time = db.Column(
        'report_time',
        db.TIMESTAMP,
     server_default=text('now()'))
    title = db.Column('title', db.String(32), index=True, unique=True, nullable=False)
    infections = db.Column('infections', db.Integer, nullable=True)
    fk_virus_type = db.Column('fk_virus_type', db.String(32), nullable=True)
    web_url = db.Column('web_url', db.Text, nullable=True)
    create_time = db.Column(
        'create_time',
        db.TIMESTAMP,
     server_default=text('now()'))

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
