from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (
    Column,
    Date,
    Integer,
    String,
    Text,
    ForeignKey,
)

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