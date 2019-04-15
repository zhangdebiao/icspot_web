#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue
  Purpose: 蜜罐日志表
  Site: http://pirogue.org
  Created: 2018-02-01 15:07:05
"""

from sqlalchemy import Column, String, Integer, Unicode, TIMESTAMP, Boolean
from sqlalchemy.orm import relationship, backref
import sys

sys.path.append("..")
from dbs.initdb import Base, engine, DBSession


class EventsLog(Base):
    __tablename__ = 'events'

    id = Column(Integer, autoincrement=True, primary_key=True)
    sensorid = Column(String(50), nullable=False)
    session = Column(Integer, nullable=False)
    timestamp = Column(TIMESTAMP, nullable=False)
    src_ip = Column(String(50), nullable=False)
    src_port = Column(String(10), nullable=False)
    protocol = Column(String(50), nullable=False)
    request = Column(String(200), nullable=False)
    response = Column(String(200), nullable=False)
    white = Column(Integer, nullable=True)
    dst_port = Column(String(10), nullable=True)


def init_db():
    Base.metadata.create_all(engine)


def drop_db():
    Base.metadata.drop_all(engine)


if __name__ == "__main__":
    init_db()
    print('create events table')

    # drop_db()
    # print('Drop Events table')

"""
CREATE TABLE IF NOT EXISTS `events` (                                                                       
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,                         
                            `sensorid` text NOT NULL,              
                            `session` text NOT NULL,                                                                     
                            `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,                                            
                            `remote` text NOT NULL,                                                                                       
                            `protocol` text NOT NULL,                                                                 
                            `request` text NOT NULL,                                   
                            `response` text NOT NULL,                                                                    
                            `white` int DEFAULT 2,                                             
                            PRIMARY KEY (`id`)                                                                           
                            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
"""
