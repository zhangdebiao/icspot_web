#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: 获取白名单ip
  Site: http://pirogue.org 
  Created: 2018-08-27 15:35:43
"""


import tornado
from base import BaseHandler
from util.auth import jwtauth
from service.whiteipservice import whiteips, insertwhiteips, deleteips, updateips
# from dbs.dal.LogOperate import LogOp
import datetime
import json


@jwtauth
class WhiteiplistHandler(BaseHandler):
    """ 获取白名单ip列表 """

    def get(self):
        res = ','.join(whiteips())
        # json.dumps(line_res)
        self.write(res)

    def write_error(self, status_code, **kwargs):
        self.write("Unable to parse JSON.1")

    def post(self):
        # 接收提交过来的ip
        if self.request.headers["Content-Type"].startswith("application/json"):
            json_args = json.loads(self.request.body.decode('utf-8'))
            ip_list = json_args["ip"].split(",")
            if ip_list:
                deleteips()
                insertwhiteips(ip_list)
            self.write(json_args)
        else:
            self.json_args = None
            message = 'Unable to parse JSON.'
            self.send_error(status_code=400)  # 向浏览器发送错误状态码，会调用write_error
        #print("_______________________updatewhiteip____________________________")
        print(ip_list)
        updateips(ip_list)
        #print("_______________________updateok____________________________")






