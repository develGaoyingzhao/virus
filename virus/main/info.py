import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger('run')
logger.setLevel(logging.DEBUG)

fh = RotatingFileHandler('info.log', encoding='UTF-8', maxBytes=1024*1024*50, backupCount=5)
fh.setLevel(logging.DEBUG)

# formatter = logging.Formatter('''
#     Time:               %(asctime)s
#     Message:
#     %(message)s
# ''')
formatter = logging.Formatter('%(asctime)s - %(lineno)d - %(message)s')
fh.setFormatter(formatter)

logger.addHandler(fh)
# logger.info('hello')
