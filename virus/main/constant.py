# -*- coding:utf-8 -*-

OK = 1000
SERVER_ERR = 1001
LOGIN_FAIL = 1200
NOT_ALLOW = 1803
COMMITED = 1804
REGISTERED = 1100
NO_USER = 1101
NO_DATA = 1808
TEMP_TOKEN = 1809
PASSWD_EXPIRE = 1810
DB_ERROR = 1002
CHECKED = 1812
ADMIN_USER = 1813
NO_TOKEN = 1201
ERR_URL = 1815
PASSWD_ERR = 1816
TOKEN_EXPIRE = 1802
PARAMS_ERR = 1818
ERR_MSG = {
    1000: '成功',
    1001: '服务器错误',
    1200: '登录失败',
    1803: '没有权限',
    1804: '已经提交',
    1100: '已经注册',
    1101: '没有用户',
    1808: '空',
    1809: '临时token',
    1810: '密码过期',
    1002: '数据库错误',
    1812: '已审核',
    1813: '管理员用户',
    1201: 'NO TOKEN',
    1815: '404',
    1816: 'passwd error!',
    1802: 'token expire!',
    1818: 'params_err!'
}
