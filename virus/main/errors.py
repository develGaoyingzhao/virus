# -*- coding:utf-8 -*-
import traceback
import sqlalchemy.exc

from flask import jsonify
from . import main
from info import logger
from .. import db


@main.errorhandler(sqlalchemy.exc.DBAPIError)
def db_exception(e):
        logger.error('Db Exception: %s', (e))
        logger.error("meet fails when the execution of a database operation")
        db.session.rollback()
        return jsonify({'code': 1004, 'msg': 'db error'}), 500


@main.errorhandler(Exception)
def unhandled_exception(e):
        logger.error('Unhandled Exception: %s', (e))
        logger.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({'code': 1004, 'msg': 'meet error'}), 500


#@main.errorhandler(404)
#def handle404(e):
#    return jsonify({'code': 1012, 'msg': 'resource not define!'})
