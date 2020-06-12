import os
import socket
import time
import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (
    Column,
    Date,
    Integer,
    String,
    Text,
    ForeignKey,
)

from models import Base, President, Speech, Match

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME") 

class DB:
    session = None

    def __init__(self):
        self.__wait_for_connection_ready()
        self.__create_tables()
        self.session = self.get_session()


    def insert_president(self, name):
        president = President(name=name)
        self.session.add(president)
        self.session.commit()
        return president


    def insert_speech(self, president_id, text, title, date):
        speech = Speech(self, president_id=president_id, text=text, title=title, date=date)
        self.session.add(speech)
        self.session.commit()
        return speech


    def insert_match(self, speech_id, sentence_number, text):
        match = Match(speech_id=speech_id, sentence_number=sentence_number, text=text)
        self.session.add(match)
        self.session.commit()
        return match


    def get_session(self):
        if (self.session is not None):
            return self.session

        db_engine = db.create_engine("{}/{}".format(DB_HOST, DB_NAME))
        return db.orm.sessionmaker(bind=db_engine)()


    def __wait_for_connection_ready(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        while True:
            try:
                s.connect(('database', 5432))
                s.close()
                break
            except socket.error as _:
                time.sleep(0.1)
    

    def __create_tables(self):
        pg_engine = db.create_engine(DB_HOST)
        with pg_engine.connect() as conn:
            connection = conn.connection.connection
            connection.set_isolation_level(0)
            conn.execute('create database {}'.format(DB_NAME))
            connection.set_isolation_level(1)

        db_engine = db.create_engine("{}/{}".format(DB_HOST, DB_NAME))
        Base.metadata.create_all(db_engine)
