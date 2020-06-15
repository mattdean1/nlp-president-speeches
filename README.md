# nlp-president-speeches

Extract and visualise mentions of climate change issues in presidential speeches (from all time).

Dockerized everything.

```
brew install make
# see list of available commands
make

# Load the data, start api and frontend client
# (you might want to go grab a ☕️) 
# look out for the climate-related sentences being printed to console
make runall

# Inspect the model generation and play around (stop the api containers first)
# Open the link from terminal and go to 'app' directory in the sidebar
make etl-notebook
```


## 1. Process + Load data (`etl`)

- Read `.txt` from filesystem
- Model iteration in Jupyter Notebooks
- Text processing and classification using NLTK and PyTorch
- All environments using docker/docker-compose

## 2. Serve (`api`)

- Simple flask app exposing rest endpoints
- Integration with VSCode debugger
- Hot reloading
- Again all dockerized

## 3. Visualise (`client`)

- React app displaying the data
- Charting with [Victory](https://formidable.com/open-source/victory/)
- Display all sentences about climate issues with related metadata (who, when)
- Highlight sentences in the context of the full speech



# How does it work

- We share the database as docker volume (`etl_postgres_data`) between the ETL and API

- The etl loads the data as follows:
	- Read each folder of president speeches, insert president and speech into the database
	- Sentences are classified using a pretrained classification model based on RoBERTa, using [SimpleTransformers lib](https://github.com/ThilinaRajapakse/simpletransformers)
	- Trained on a corpus of sentences about [climate change](https://en.wikipedia.org/wiki/Global_warming) and [not about climate change](https://winstonchurchill.org/resources/speeches/1940-the-finest-hour/their-finest-hour/)
	- Note: we see many sentences being misclassified - e.g. most sentences with numbers in end up the `climate` set - that could be mitigated by using larger and more representative training datasets

That model actually took too much time to return predictions :(, so I reverted to the original "classifier" - does the sentence contain 1 or more keywords in the set e.g. ["climate", "environment", "green"].

# What's next

1. Use larger datasets for training/evaluation, speed up prediction by passing in more sentences at once or using a smaller model
2. Share db models between etl and api
3. Setup python linting / static analysis

- Split president names into firstname/lastname for better sorting
- Return pre-sorted / precomputed data from extra endpoints -- then we need to do less manipulation on the client
- Transform / format data when we recieve it in client (get rid of those underscores 🤮)
- Add (more) tests in js and python

# Sources

- https://medium.com/@philipplies/reproducible-machine-learning-with-docker-jupyterlab-and-fastai-pytorch-6080fdac3d0f
- https://towardsdatascience.com/conda-pip-and-docker-ftw-d64fe638dc45
- https://pythonspeed.com/articles/activate-conda-dockerfile/


