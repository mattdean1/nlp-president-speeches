import os
import re
from datetime import datetime
import nltk
from pipeline.president_names import president_names
from speeches.database import db, President, Speech, Session, Match

nltk.download('punkt')
root_dir = './data'
keywords = set(['climate', 'green', 'environment'])

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

def insert_president(session, name):
    president = President(name=name)
    session.add(president)
    session.commit()
    return president

def insert_speech(session, president_id, text, title, date):
    speech = Speech(president_id=president_id, text=text, title=title, date=date)
    session.add(speech)
    session.commit()
    return speech

def insert_match(session, speech_id, sentence_number, text):
    match = Match(speech_id=speech_id, sentence_number=sentence_number, text=text)
    session.add(match)
    

session = Session()

for president_directory in sorted(os.listdir(root_dir)):
    president_name = president_names[president_directory]
    print("Processing speeches for {}".format(president_name))
    dir_path = os.path.join(root_dir, president_directory)

    president = insert_president(session, president_name)

    for filename in sorted(os.listdir(dir_path)):
        speech_path = os.path.join(dir_path, filename)
        speech = open(speech_path)    
        
        title_meta = speech.readline()
        title = parse_title_meta(title_meta)

        date_meta = speech.readline()
        date = parse_date_meta(date_meta)
        
        raw_text = speech.read()

        speech = insert_speech(session, president.president_id, raw_text, title, date)

        sentences = get_matching_sentences(raw_text)
        for sentence in sentences:
            insert_match(session, speech_id=speech.speech_id, sentence_number=sentence["index"], text=sentence["text"])
        session.commit()
    




