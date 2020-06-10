from flask import Flask
from flask_cors import CORS
from speeches.views import map_views
from speeches.database import db, DATABASE_URL


def make_app():
    _app = Flask(__name__)
    CORS(_app)
    _app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
    _app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(_app)
    map_views(_app)
    return _app


app = make_app()
