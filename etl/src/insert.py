import os
import re
from datetime import datetime
import nltk
from president_names import president_names
from models import President, Speech, Match
from database import DB

nltk.download('punkt')
root_dir = './data'
keywords = set(['climate', 'green', 'environment'])
db = DB()

def parse_date_meta(string):
    pattern = r'"(.*)"'
    match = re.search(pattern, string).group(1)
    dt = datetime.strptime(match, "%B %d, %Y")
    return dt.date()

def parse_title_meta(string):
    pattern = r'"(.*)"'
    match = re.search(pattern, string).group(1)
    return match

def get_matching_sentences(text):
    # very mvp
    sentences = nltk.tokenize.sent_tokenize(text)
    matching_sentences = []
    for index, sentence in enumerate(sentences):
        words = set(nltk.tokenize.word_tokenize(sentence.lower()))
        if keywords.intersection(words):
            matching_sentences.append({ 'index': index, 'text': sentence})

    return matching_sentences

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
    




