#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: 日志列表展示
  Site: http://pirogue.org 
  Created: 2018-08-06 17:25:24
"""

#from dbs.dal.LogOperate import LogOp
from dbs.dal.LogEvents import LogEp
import sys
reload(sys)
sys.setdefaultencoding('utf8')

logselect = LogEp()
#logselect = LogOp()


def listpage(param):
    if param.has_key("white") and param.has_key("page"):
        page = param["page"]
        # print page
        page_list = []
        second_page_list = []
        for i in logselect.page_select_white(page):
            dict_param = {"id":i.id,"sensorid":i.sensorid, "session":i.session, \
                    "timestamp":i.timestamp.strftime("%Y-%m-%d %H:%M:%S"), "src_ip":i.src_ip, "src_port":i.src_port, \
                    "protocol":i.protocol, "request":i.request, "response":i.response, "white":i.white, \
                    "dst_port": i.dst_port}
            page_list.append(dict_param)
        #print(page_list)

        for i in page_list:
            #print("*************page_list**********************")
            #print(i)
            if i["protocol"] == 'ftp':
                i["protocol"] = 'ftp登录尝试'
                i["dst_port"] = "21"
            elif i["protocol"] == 'http':
                i["protocol"] = 'http请求'
                i["dst_port"] = "80"
            elif i["protocol"] == 'modbus':
                i["protocol"] = 'modbus恶意攻击'
                i["dst_port"] = "502"
            elif i["protocol"] == 's7comm':
                i["protocol"] = 's7comm建立连接'
                i["dst_port"] = "102"
            elif i["protocol"] == 'snmp':
                i["protocol"] = 'snmp建立连接'
                i["dst_port"] = "161/udp"
            elif i["protocol"] == 'bacnet':
                i["protocol"] = 'bacnet建立连接'
                i["dst_port"] = "47808/udp"
            elif i["protocol"] == 'ipmi':
                i["protocol"] = 'ipmi建立连接'
                i["dst_port"] = "623/udp"
            elif i["protocol"] == 'tftp':
                i["protocol"] = 'tftp登录尝试'
                i["dst_port"] = "69/udp"
            elif i["protocol"] == 'Ether/IP':
                i["protocol"] = 'Ether/IP建立连接'
                i["dst_port"] = "44818"

            second_dict_param = {"id":i["id"],"sensorid":i["sensorid"],"session":i["session"],"timestamp":i["timestamp"],\
                    "src_ip":i["src_ip"],"src_port":i["src_port"],"protocol":i["protocol"],"request":i["request"],\
                    "response":i["response"],"white":i["white"], "dst_port":i["dst_port"]}
            #print("*********************second_dict_param*******************************")
            #print(second_dict_param)
            second_page_list.append(second_dict_param)

        page_res = {"list": second_page_list}

        print("********************************white****************************************")
        print(page_res)
        return page_res
    else:
        if param.has_key("page"):
            page = param["page"]
            # print page
            page_list = []
            second_page_list = []
            for i in logselect.page_select_attack(page):
                dict_param = {"id":i.id,"sensorid":i.sensorid, "session":i.session, \
                        "timestamp":i.timestamp.strftime("%Y-%m-%d %H:%M:%S"), "src_ip":i.src_ip, "src_port":i.src_port,\
                        "protocol":i.protocol, "request":i.request, "response":i.response, "white":i.white,\
                        "dst_port":i.dst_port}
                page_list.append(dict_param)

            for i in page_list:
                # print i
                if i["protocol"] == 'ftp':
                    i["protocol"] = 'ftp登录尝试'
                    i["dst_port"] = '21'
                elif i["protocol"] == 'http':
                    i["protocol"] = 'http请求'
                    i["dst_port"] = '80'
                elif i["protocol"] == 'modbus':
                    i["protocol"] = 'modbus恶意攻击'
                    i["dst_port"] = '502'
                elif i["protocol"] == 's7comm':
                    i["protocol"] = 's7comm建立连接'
                    i["dst_port"] = '102'
                elif i["protocol"] == 'snmp':
                    i["protocol"] = 'snmp建立连接'
                    i["dst_port"] = '161'
                elif i["protocol"] == 'bacnet':
                    i["protocol"] = 'bacnet建立连接'
                    i["dst_port"] = '47808/udp'
                elif i["protocol"] == 'ipmi':
                    i["protocol"] = 'ipmi建立连接'
                    i["dst_port"] = '623/udp'
                elif i["protocol"] == 'tftp':
                    i["protocol"] = 'tftp登录尝试'
                    i["dst_port"] = '69/udp'
                elif i["protocol"] == 'Ether/IP':
                    i["protocol"] = 'Ether/IP建立连接'
                    i["dst_port"] = '44818'
                    
                second_dict_param = {"id":i["id"],"sensorid":i["sensorid"],"session":i["session"],\
                        "timestamp":i["timestamp"],"src_ip":i["src_ip"],"src_port":i["src_port"],\
                        "protocol":i["protocol"],"request":i["request"],"response":i["response"],\
                        "white":i["white"],"dst_port":i["dst_port"]}

                second_page_list.append(second_dict_param)
                #print(second_dict_param)
            page_res = {"list": second_page_list}
            print("_____________________________attack___________________________________")
            print page_res
            return page_res


def total_atk_page():
    # 查询攻击列表数量
    return logselect.select_attack_total()


def total_wit_page():
    # 查询过滤列表数量
    return logselect.select_filter_total()


