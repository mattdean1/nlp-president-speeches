import nltk
from simpletransformers.classification import ClassificationModel

nltk.download('punkt')
model = ClassificationModel(
    "roberta", "/app/model-outputs", use_cuda=False
)

def get_matching_sentences(text):
    sentences = nltk.tokenize.sent_tokenize(text)
    predictions, _ = model.predict(sentences)

    matching_sentences = []
    for index, prediction in enumerate(predictions):
        if prediction == 1:
            print("\n {}".format(sentences[index]))
            matching_sentences.append({ 'index': index, 'text': sentences[index]})

    return matching_sentences