from flask.views import MethodView
from flask import jsonify
from speeches.database import President, Speech, Match


class PresidentViews(MethodView):

    root = "/presidents"

    def get(self, id):
        if id:
            return self._get_single(id)
        return self._get_all()

    def _get_single(self, id):
        pres = President.query.get_or_404(id)
        return jsonify({
            "name": pres.name,
            "id": pres.president_id,
        })

    def _get_all(self):
        presidents = []
        for pres in President.query.all():
            presidents.append({
                "id": pres.president_id,
                "name": pres.name})

        return jsonify(presidents)


class SpeechViews(MethodView):
    root = "/speeches"

    def get(self, id):
        if id:
            return self._get_single(id)
        return self._get_all()

    def _get_single(self, id):
        speech = Speech.query.get_or_404(id)
        return jsonify({
            "file": speech.file,
            "id": speech.speech_id,
            "president_id": speech.president_id,
        })

    def _get_all(self):
        speeches = []
        for speech in Speech.query.all():
            speeches.append({
                "id": speech.speech_id,
                "file": speech.file,
                "president_id": speech.president_id,
            })

        return jsonify(speeches)


class MatchViews(MethodView):
    root = "/matches"

    def get(self, id):
        if id:
            return self._get_single(id)
        return self._get_all()

    def _get_single(self, id):
        match = Match.query.get_or_404(id)
        return jsonify({
            "text": match.text,
            "speech_id": match.speech_id,
            "id": match.match_id,
            "page_num": match.page_num
        })

    def _get_all(self):
        matches = []
        for match in Match.query.all():
            matches.append({
                "text": match.text,
                "speech_id": match.speech_id,
                "id": match.match_id,
                "page_num": match.page_num
            })
        return jsonify(matches)


def map_views(app):
    for cls in [PresidentViews, SpeechViews, MatchViews]:
        view = cls.as_view(cls.__name__)
        app.add_url_rule(cls.root, defaults={"id": None},
                         view_func=view, methods=["GET", ])
        app.add_url_rule(f'{cls.root}/<int:id>',
                         view_func=view, methods=["GET", ])
