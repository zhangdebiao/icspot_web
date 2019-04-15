#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue
  Purpose: 日志表操作
  Site: http://pirogue.org
  Created: 2018-08-03 17:32:54
"""

from dbs.initdb import DBSession
from dbs.models.Event import EventsLog
from dbs.models.Whiteip import Whiteip
from sqlalchemy import desc, asc, extract, func, distinct
from sqlalchemy.exc import InvalidRequestError


class LogEp:
    """增删改查"""

    def __init__(self):
        self.session = DBSession

    def insert(self, sensorid, session, timestamp, src_ip, src_port, protocol, request, response, white):

        loginsert = EventsLog(sensorid=sensorid, session=session, timestamp=timestamp, src_ip=src_ip, \
                src_port=src_port, protocol=protocol, request=request, response=response, white=white, dst_port=dst_port)

        if loginsert:
            try:
                self.session.add(loginsert)
                self.session.commit()
                return True
            except InvalidRequestError:
                self.session.rollback()
            except Exception as e:
                print(e)
            finally:
                self.session.close()
        else:
            return False


    # 查询日志表攻击列表数据
    def page_select_attack(self, page_index):
        try:
            page_size = 10
            # num = 10*int(page) - 10
            logselect = self.session.query(EventsLog).filter(
                EventsLog.white == 2).order_by(
                desc(EventsLog.timestamp),
                EventsLog.id).limit(page_size).offset(
                (page_index - 1) * page_size)
            return logselect
        except InvalidRequestError:
            self.session.rollback()
        except Exception as e:
            print(e)
        finally:
            self.session.close()


    # 查询日志表白名单数据
    def page_select_white(self, page_index):
        try:
            page_size = 10
            # num = 10*int(page) - 10
            logselect = self.session.query(EventsLog).filter(
                EventsLog.white == 1).order_by(
                desc(EventsLog.timestamp),
                EventsLog.id).limit(page_size).offset(
                (page_index - 1) * page_size)
            return logselect
        except InvalidRequestError:
            self.session.rollback()
        except Exception as e:
            print(e)
        finally:
            self.session.close()


    # 查询当年每月攻击数量
    def attack_select_num(self, months):
        try:
            attack_num = self.session.query(
                extract('month', EventsLog.timestamp).label('month'),
                func.count('*').label('count')).filter(
                extract('year', EventsLog.timestamp) == months,
                EventsLog.white == 2).group_by('month').all()
            return attack_num
        except InvalidRequestError:
            self.session.rollback()
        except Exception as e:
            print(e)
        finally:
            self.session.close()


    # 查询当年每月白名单内攻击数量
    def white_select_num(self, months):
        try:
            white_num = self.session.query(
                extract('month', EventsLog.timestamp).label('month'),
                func.count('*').label('count')).filter(
                extract('year', EventsLog.timestamp) == months,
                EventsLog.white == 1).group_by('month').all()
            return white_num
        except InvalidRequestError:
            self.session.rollback()
        except Exception as e:
            print(e)
        finally:
            self.session.close()


    # 查询各类攻击数量
    def pie_select_num(self, years):
        try:
            pie_num = self.session.query(
                func.count(EventsLog.protocol),
                EventsLog.protocol).group_by(EventsLog.protocol).filter(
                extract('year', EventsLog.timestamp) == years,
                EventsLog.white == 2).all()
            return pie_num
        except InvalidRequestError:
            self.session.rollback()
        except Exception as e:
            print(e)
        finally:
            self.session.close()


    # 查询攻击数据总量
    def select_attack_total(self):
        try:
            total_attack = self.session.query(
                func.count(EventsLog.id)).filter(
                EventsLog.white == 2).scalar()
            return total_attack
        except InvalidRequestError:
            self.session.rollback()
        except Exception as e:
            print(e)
        finally:
            self.session.close()


    # 查询过滤列表总量
    def select_filter_total(self):
        try:
            total_filter = self.session.query(
                func.count(EventsLog.id)).filter(
                EventsLog.white == 1).scalar()
            return total_filter
        except InvalidRequestError:
            self.session.rollback()
        except Exception as e:
            print(e)
        finally:
            self.session.close()


    # 更新所有whiteip
    def update_white_ip(self, ips):
        sql = "update events set white=1 where src_ip='%s'" % ips
        #print(sql)
        self.session.execute(sql)
        self.session.commit()
        return True


    # 更新所有whiteport
    def update_white_port(self, ports):
        sql = "update events set white=1 where dst_port='%s'" % ports
        self.session.execute(sql)
        self.session.commit()
        #print(sql)
        return True

    # 恢复所有white
    def recovery_white(self):
        sql = "update events set white=2"
        self.session.execute(sql)
        self.session.commit()
        print(sql)
        return True


