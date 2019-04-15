#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: 日志列表分页
  Site: http://pirogue.org 
  Created: 2018-08-06 18:33:29
"""


import tornado
import json
from service.paginationlog import listpage, total_atk_page, total_wit_page
from base import BaseHandler
from util.auth import jwtauth

@jwtauth
class GetlistJsonHandler(BaseHandler):
    """ 获取日志列表 """

    # 自定义错误页面
    def write_error(self,status_code,**kwargs):
        #self.set_header('Content-Type', 'application/json')
        self.write("Unable to parse JSON.12")
        #res = '{"remote": "192.168.1.250", "timestamp": 201948122347, "protocol": "ftp\xe7\x99\xbb\xe5\xbd\x95\xe5\xb0\x9d\xe8\xaf\x95"}'
        #self.write(res)

    def post(self):
        # 
        if self.request.headers["Content-Type"].startswith("application/json"):
            self.json_args = json.loads(self.request.body)
            #print(self.request.body)
        else:
            self.json_args = None
            message = 'Unable to parse JSON.'
            self.send_error(status_code=400) # 向浏览器发送错误状态码，会调用write_error

        param = self.request.body.decode('utf-8')
        # print 'page start'

        param = json.loads(param)
        #print("__________________prarml_____________________")
        #print param
        viewres = listpage(param)
        #print(type(param))
        
        #print(viewres)
        
        self.write(viewres)
        #self.write("viewres---test---ok")

    def get(self):
        # 分页列表
        types = self.get_argument('type')
        if types:
            if int(types) == 1:
                print(str(total_wit_page()))
                self.write(str(total_wit_page()))
            elif int(types) == 2:
                self.write(str(total_atk_page()))

