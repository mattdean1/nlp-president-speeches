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

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
while True:
    try:
        s.connect(('database', 5432))
        s.close()
        break
    except socket.error as ex:
        time.sleep(0.1)

pg_engine = db.create_engine(DB_HOST)
with pg_engine.connect() as conn:
    connection = conn.connection.connection
    connection.set_isolation_level(0)
    conn.execute('create database {}'.format(DB_NAME))
    connection.set_isolation_level(1)

db_engine = db.create_engine("{}/{}".format(DB_HOST, DB_NAME))


Base = declarative_base()


class President(Base):
    __tablename__ = "presidents"
    president_id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class Speech(Base):
    __tablename__ = "speeches"

    speech_id = Column(Integer, primary_key=True)
    text = Column(Text)
    president_id = Column(Integer, ForeignKey('presidents.president_id'))
    title = Column(String)
    date = Column(Date)


class Match(Base):
    __tablename__ = "matches"

    match_id = Column(Integer, primary_key=True)
    speech_id = Column(Integer, ForeignKey('speeches.speech_id'))
    sentence_number = Column(Integer, nullable=False)
    text = Column(String, nullable=False)


Base.metadata.create_all(db_engine)

Session = db.orm.sessionmaker(bind=db_engine)