from http import HTTPStatus
from functools import wraps
import pytest
from speeches.database import db, President, Speech, Session, Match
from speeches.app import make_app


def datafixture(fn):

    @wraps(fn)
    def wrapper(db_sess, *args, **kwargs):
        inst = fn(db_sess, *args, **kwargs)
        db_sess.add(inst)
        db_sess.commit()
        try:
            yield inst
        finally:
            db_sess.delete(inst)
            db_sess.commit()

    return pytest.fixture(wrapper)


@pytest.fixture
def app():
    app = make_app()
    return app


@pytest.fixture()
def db_sess():
    sess = Session()
    try:
        yield sess
    except:
        sess.rollback()


@datafixture
def abe_lincoln(db_sess):
    return President(name="Abe Lincoln")


@datafixture
def gettysburg_address(db_sess, abe_lincoln):
    return Speech(president_id=abe_lincoln.president_id,
                  file="test_file.txt")


@datafixture
def four_score(db_sess, gettysburg_address):
    return Match(
        speech_id=gettysburg_address.speech_id,
        page_num=0,
        text="Four Score",
    )


def test_can_get_presidents(abe_lincoln, client):
    res = client.get("/presidents")
    assert res.status_code == HTTPStatus.OK

    assert len(res.json) == 1
    assert res.json[0]["name"] == abe_lincoln.name


def test_can_get_single(abe_lincoln, client):
    res = client.get(f"/presidents/{abe_lincoln.president_id}")
    assert res.status_code == HTTPStatus.OK
    assert res.json["name"] == abe_lincoln.name


def test_can_get_speeches(gettysburg_address, client):
    res = client.get("/speeches")
    assert res.status_code == HTTPStatus.OK

    assert len(res.json) == 1
    assert res.json[0]["file"] == gettysburg_address.file


def test_can_get_speech(gettysburg_address, client):
    res = client.get(f"/speeches/{gettysburg_address.speech_id}")
    assert res.status_code == HTTPStatus.OK

    assert res.json["president_id"] == gettysburg_address.president_id
    assert res.json["file"] == gettysburg_address.file


def test_can_get_matches(four_score, client):
    res = client.get("/matches")
    assert res.status_code == HTTPStatus.OK
    assert len(res.json) == 1
    assert res.json[0]["text"] == four_score.text
    assert res.json[0]["speech_id"] == four_score.speech_id


def test_can_get_match(four_score, client):
    res = client.get(f"/matches/{four_score.match_id}")
    assert res.status_code == HTTPStatus.OK
    assert res.json["text"] == four_score.text
    assert res.json["speech_id"] == four_score.speech_id
