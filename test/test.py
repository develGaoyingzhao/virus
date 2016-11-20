from urllib2 import Request, urlopen
import json

values = """
  {
    "username": "mynamegyz@163.com",
    "password": "12sdad-sadasda-dasdasda-dasdada"
  }
"""

headers = {
  'Content-Type': 'application/json'
}
request = Request('http://127.0.0.1:5000/users', data=values, headers=headers)

response_body = urlopen(request).read()
print response_body
values = """
  {
    "username": "admin@163.com",
    "password": "12sdad-sadasda-dasdasda-dasdada"
  }
"""

headers = {
  'Content-Type': 'application/json'
}
request = Request('http://127.0.0.1:5000/users', data=values, headers=headers)

response_body = urlopen(request).read()
print response_body
from urllib2 import Request, urlopen

values = """
  {
    "username": "mynamegyz@163.com",
    "password": "12sdad-sadasda-dasdasda-dasdada"
  }
"""

headers = {
  'Content-Type': 'application/json'
}
request = Request('http://127.0.0.1:5000/login', data=values, headers=headers)

response_body = urlopen(request).read()
print response_body
print type(response_body)
#values = """
#  {
#    "token": "12sdad-sadasda-dasdasda-dasdada"
#  }
#"""
values = json.dumps({ "token": json.loads(response_body).get('data').get('token') })
print values

headers = {
  'Content-Type': 'application/json'
}
request = Request('http://127.0.0.1:5000/logout', data=values, headers=headers)

response_body = urlopen(request).read()
print response_body
values = """
  {
    "username": "admin@163.com",
    "password": "12sdad-sadasda-dasdasda-dasdada"
  }
"""

headers = {
  'Content-Type': 'application/json'
}
request = Request('http://127.0.0.1:5000/login', data=values, headers=headers)

response_body = urlopen(request).read()
print response_body
token =  json.loads(response_body).get('data').get('token')
values = json.dumps(
{
    "token": token,
    "name": "asadad",
    "serial_number": "2016-09-13",
    "gene_type": "sada",
    "location": 23,
    "time": 1997,
    "source": "1",
    "sequence_length": 123,
})

headers = {
  'Content-Type': 'application/json'
}
request = Request('http://127.0.0.1:5000/virus', data=values, headers=headers)

response_body = urlopen(request).read()
print response_body

values = json.dumps(
{
    "token": token,
    "news_type": "asadad",
    "report_time": "2016-09-13",
    "title": "sada",
    "infections": 23,
    "web_url": "http://baidu.com",
})

headers = {
  'Content-Type': 'application/json'
}
request = Request('http://127.0.0.1:5000/news', data=values, headers=headers)

response_body = urlopen(request).read()
print response_body

request = Request('http://127.0.0.1:5000/virus?key=time&data=1997')

response_body = urlopen(request).read()
print response_body
