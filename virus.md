FORMAT: 1A
HOST: http://127.0.0.1:5000/

# Virus Website API

查询相关病毒分布情况
返回值参考:
1000: 成功；
1001：服务器错误；
1002：数据库错误：
1003：Redis错误；
1100：用户已存在；
1101：用户不存在；
1200：密码错误；
1201：token不存在；

## Login [/login]

### Login [POST]

Login with username, password(password执行过一次md5的加密).

+ Request (application/json)

        {
            "username": "mynamegyz@163.com",
            "password": "12sdad-sadasda-dasdasda-dasdada"
        }

+ Response 200 (application/json)

    + Headers

            Location: /login

    + Body

            {
                "code": "1000",
                "msg": "success!",
                "data": {
                    "token": "12sdad-sadasda-dasdasda-dasdada",
                    "role": "1"
                }
            }

## Users Collection [/users]

### 用户注册 [POST]

参数：username(email), password(password执行过一次md5的加密).

+ Request (application/json)

        {
            "username": "mynamegyz@163.com",
            "password": "12sdad-sadasda-dasdasda-dasdada"
        }

+ Response 200 (application/json)

    + Headers

            Location: /users

    + Body

            {
                "code": "1000",
                "msg": "success!",
                "data": {
                }
            }

## Virus Collection [/virus?{key}{data}]

### List All Virus [GET]

+ Parameters
    + key (string) ... 类型；
    + data (string) ... 来源；

+ Response 200 (application/json)

    + Headers

            Location: /virus

    + Body

            {
                {
                    "code": "1000",
                    "msg": "success!",
                    "data": [
                        {
                            "id": "1",
                            "name": "asadad",
                            "serial_number": "AB0921",
                            "gene_type": "sada",
                            "location": "Japan",
                            "time": 1990,
                            "source": 1,
                            "sequence_length": 123
                        }, {
                            "id": "1",
                            "name": "asadad",
                            "serial_number": "AB0921",
                            "gene_type": "sada",
                            "location": "USA",
                            "time": 2005
                            "source": 1,
                            "sequence_length": 123
                        }
                    ]
                }
            }

## Virus Collection [/virus/{id}]

### Get one Virus Detail [GET]

+ Parameters
    + id (string) ... id；

+ Response 200 (application/json)

    + Headers

            Location: /virus/{id}

    + Body

            {
                {
                    "code": "1000",
                    "msg": "success!",
                    "data": {
                        "id": "1",
                        "name": "asadad",
                        "serial_number": "AB0921",
                        "gene_type": "sada",
                        "location": "Japan",
                        "time": 1990,
                        "source": 1,
                        "sequence_length": 123
                    }
                }
            }

## News Collection [/news]

### Create An News [POST]

+ Request (application/json)

        {
            "token": "1233-2121sadsa-2131dsad-21sas",
            "news_type": "asadad",
            "report_time": "2016-09-13",
            "title": "sada",
            "infections": 23,
            "web_url": "http://baidu.com",
        }

+ Response 200 (application/json)

    + Headers

            Location: /papers

    + Body

            {
                "code": "1000",
                "msg": "success!",
                "data": {
                }
            }

## News Collection [/news?{page_size}{page_index}]

### List All News [GET]

+ Parameters
    + page_size (string) ... 页面容积；
    + page_index (string) ... 当前页；

+ Response 200 (application/json)

    + Headers

            Location: /news

    + Body

            {
                {
                    "code": "1000",
                    "msg": "success!",
                    "data": [
                        {
                            "id": "1",
                            "news_type": "asadad",
                            "report_time": "2016-09-13",
                            "title": "sada",
                            "infections": 23,
                            "web_url": "http://baidu.com",
                        }, {
                            "id": "2",
                            "news_type": "asadad",
                            "report_time": "2016-09-13",
                            "title": "sada",
                            "infections": 23,
                            "web_url": "http://baidu.com",
                        }
                    ]
                }
            }

## Papers Collection [/papers]

### Create A Paper [POST]

+ Request (application/json)

        {
            "token": "1233-2121sadsa-2131dsad-21sas",
            "host": "mynamegyz@163.com",
            "status": "12sdad-sadasda-dasdasda-dasdada"
            "infections": 23,
            "url": "http://baidu.com",
        }

+ Response 200 (application/json)

    + Headers

            Location: /papers

    + Body

            {
                "code": "1000",
                "msg": "success!",
                "data": {
                }
            }

## Papers Collection [/papers?{page_size}{page_index}]

### List All Papers [GET]

+ Parameters
    + page_size (string) ... 页面容积；
    + page_index (string) ... 当前页；

+ Response 200 (application/json)

    + Headers

            Location: /papers

    + Body

            {
                {
                    "code": "1000",
                    "msg": "success!",
                    "data": [
                        {
                            "id": "1",
                            "host": "asadad",
                            "status": "1",
                            "infections": 23,
                            "url": "http://baidu.com",
                        }, {
                            "id": "2",
                            "host": "asadad",
                            "status": "1",
                            "infections": 23,
                            "url": "http://baidu.com",
                        }
                    ]
                }
            }
