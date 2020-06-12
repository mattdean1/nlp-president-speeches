import os
from datetime import datetime

from president_names import president_names
from models import President, Speech, Match
from database import DB
from parse_file import parse_date_meta, parse_title_meta
from get_matches import get_matching_sentences


root_dir = './data'
db = DB()


for president_directory in sorted(os.listdir(root_dir)):
    president_name = president_names[president_directory]
    print("Processing speeches for {}".format(president_name))
    dir_path = os.path.join(root_dir, president_directory)

    president = db.insert_president(president_name)

    for filename in sorted(os.listdir(dir_path)):
        speech_path = os.path.join(dir_path, filename)
        speech = open(speech_path)    
        
        title_meta = speech.readline()
        title = parse_title_meta(title_meta)

        date_meta = speech.readline()
        date = parse_date_meta(date_meta)
        
        raw_text = speech.read()

        speech = db.insert_speech(president.president_id, raw_text, title, date)

        sentences = get_matching_sentences(raw_text)
        for sentence in sentences:
            db.insert_match(speech_id=speech.speech_id, sentence_number=sentence["index"], text=sentence["text"])
    



