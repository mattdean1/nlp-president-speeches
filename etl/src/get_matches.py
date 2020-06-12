import nltk

nltk.download('punkt')
keywords = set(['climate', 'green', 'environment'])

def get_matching_sentences(text):
    # very mvp
    sentences = nltk.tokenize.sent_tokenize(text)
    matching_sentences = []
    for index, sentence in enumerate(sentences):
        words = set(nltk.tokenize.word_tokenize(sentence.lower()))
        if keywords.intersection(words):
            matching_sentences.append({ 'index': index, 'text': sentence})

    return matching_sentences