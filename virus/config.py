import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    REDIS_URL = "redis://:@localhost:6379/4"
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SECRET_KEY = "George Gao is a hero!"
    UPLOAD_FOLDER = 'upload/'
    FRONT_URL = UPLOAD_FOLDER + 'tender_manage/'
    TOKEN_EXPIRE = 3600*2

    @staticmethod
    def init_app(app):
        pass

class LocalConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('LOCAL_DATABASE_URL') or \
        'mysql://root:root123@127.0.0.1:3306/virus?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'mysql://root:root123@127.0.0.1:3306/virus?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
        'mysql://root:ptdAChu+byhzq2dCc0&MLd@127.0.0.1:3306/log_test?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

class TrialConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TRIAL_DATABASE_URL') or \
        'mysql://root:ptdAChu+byhzq2dCc0&MLd@127.0.0.1:3306/log_trial?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'data.sqlite')
    DEBUG = False


config = {
    'dev': DevelopmentConfig,
    'test': TestingConfig,
    'trial': TrialConfig,
    'local': LocalConfig,
    'pro': ProductionConfig,

    'default': LocalConfig
}
