import nltk
from simpletransformers.classification import ClassificationModel

nltk.download('punkt')


model = ClassificationModel(
    "roberta", "/app/model-outputs", use_cuda=False
)

def get_matching_sentences_with_model(text):
    sentences = nltk.tokenize.sent_tokenize(text)
    predictions, _ = model.predict(sentences)

    matching_sentences = []
    for index, prediction in enumerate(predictions):
        if prediction == 1:
            print("\n {}".format(sentences[index]))
            matching_sentences.append({ 'index': index, 'text': sentences[index]})

    return matching_sentences




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