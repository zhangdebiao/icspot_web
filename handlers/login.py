#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: 登录认证
  Site: http://pirogue.org 
  Created: 2018-08-07 20:34:19
"""

import tornado.escape
import tornado.ioloop
import tornado.web
import jwt
import datetime
from util.auth import jwtauth
import json
from base import BaseHandler
from dbs.initdb import Base, engine, DBSession
from dbs.models.Users import User

SECRET = 'opencanary123456789zdsfjoqfjladfs'


# @jwtauth
# class HelloHandler(BaseHandler):

#     def get(self):
#         # Contains user found in previous auth
#         if self.request.headers.get('auth'):
#             self.write('ok')


class AuthHandler(BaseHandler):

    # 自定义错误页面
    def write_error(self, status_code, **kwargs):
        self.write("Unable to parse JSON.")


    def post(self):

        if self.request.headers["Content-Type"].startswith("application/json"):
            # self.set_header("Authorization","")
            if self.request.body:
                # print self.request.body
                data = json.loads(self.request.body.decode('utf-8'))
                # print data
                try:
                    username = data["username"]
                    password = data["password"]
                except:
                    self.set_status(403)
                    return

                if username and password:
                    import hashlib
                    pwd = hashlib.md5(password).hexdigest()
                    result = DBSession.query(User).filter(User.username == username,
                                                    User.password == pwd).scalar()
                    DBSession.close()
                    # if authres:
                    #     result = authres

                    if result is not None and result.id is not None:
                        dataToken = {"id": result.id, "role": result.username, "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=3600)}
                        token = jwt.encode(dataToken,  SECRET, algorithm='HS256')
                        status = True
                        role = result.username
                    else:
                        token = None
                        status = False
                        role = "Invalid Username or Password."
                        # print {"data": res, "result": status, "token": token}
                    self.write({"role": role, "result": status, "token": token})
                    self.finish()
