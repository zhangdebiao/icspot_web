#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: 白名单过滤
  Site: http://pirogue.org 
  Created: 2018-08-17 16:15:08
"""

from dbs.dal.Whiteip import White
from dbs.dal.LogEvents import LogEp
# import sys
# sys.path.append("..")

White_res = White()
loginst = LogEp()


def whiteips():
    list_ip = []
    for ip in White_res.white_ip():
        list_ip.append(ip[0])
    return list_ip


def insertwhiteips(list_port):
    for p in list_port:
        if p:
            White_res.insert_white_ip(str(p))
    return True


def deleteips():
    White_res.delete_white_ip()
    return True


def updateips(ip_list):
    loginst.recovery_white()
    for ip in ip_list:
        print(ip)
        loginst.update_white_ip(ip)


