import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (
    Column,
    Date,
    Integer,
    String,
    Text,
    ForeignKey,
    create_engine,
)
from sqlalchemy.orm import sessionmaker


db = SQLAlchemy()


class President(db.Model):
    __tablename__ = "presidents"
    president_id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class Speech(db.Model):
    __tablename__ = "speeches"

    speech_id = Column(Integer, primary_key=True)
    text = Column(Text)
    president_id = Column(Integer, ForeignKey('presidents.president_id'))
    title = Column(String)
    date = Column(Date)


class Match(db.Model):
    __tablename__ = "matches"

    match_id = Column(Integer, primary_key=True)
    speech_id = Column(Integer, ForeignKey('speeches.speech_id'))
    sentence_number = Column(Integer, nullable=False)
    text = Column(String, nullable=False)


DATABASE_URL = os.getenv("DATABASE_URL",
                         "postgresql://postgres:postgres@localhost/president_db")

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)