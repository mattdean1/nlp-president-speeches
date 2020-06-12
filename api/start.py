from speeches.app import app
from speeches.database import db

db.create_all(app=app)
