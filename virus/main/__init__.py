from flask import Blueprint

# main = Blueprint('main', __name__, url_prefix='/v1')
main = Blueprint('main', __name__)

from . import views, errors
