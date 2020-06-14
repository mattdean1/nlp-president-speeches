# NP Tech test

# Prereqs

Make sure you have [git-lfs](https://help.github.com/en/github/managing-large-files/installing-git-large-file-storage) installed to download the model file.

```
brew install git-lfs
git lfs install
git clone https://github.com/mattdean1/netpurpose
```

# How to run

```
brew install make
# see list of available commands
make

# Load the data, start api and frontend client
# (you might want to go grab a ☕️ - it took about 1 hour for me) 
# look out for the climate-related sentences being printed to console
make runall

# Inspect the model generation and play around (stop the api containers first)
# Open the link from terminal and go to 'app' directory in the sidebar
make etl-notebook
```

# How does it work

- We share the database as docker volume (`etl_postgres_data`) between the ETL and API

- The etl loads the data as follows:
	- Read each folder of president speeches, insert president and speech into the database
	- Sentences are classified using a pretrained classification model based on RoBERTa, using [SimpleTransformers lib](https://github.com/ThilinaRajapakse/simpletransformers)
	- Trained on a corpus of sentences about [climate change](https://en.wikipedia.org/wiki/Global_warming) and [not about climate change](https://winstonchurchill.org/resources/speeches/1940-the-finest-hour/their-finest-hour/)
	- Note: we see many sentences being misclassified - e.g. most sentences with numbers in end up the `climate` set - that could be mitigated by using larger and more representative training datasets

To begin with I used a simpler classifier - does the sentence contain 1 or more keywords in the set e.g. ["climate", "environment", "green"], which actually produced fairly good results

# What's next

1. Use larger datasets for training/evaluation, speed up prediction by passing in more sentences at once
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


---------

## Overview

This exercise is intended as an opportunity for you to showcase some of your skills across both the frontend and backend of the application stack. Included in this repo is the basis of a simple REST API for exposing data about text matches from speeches of american presidents. The backend is a simple flask application with a very simple data model, the front end is a simple react app which displays the data as a table.

# Dependencies
You will need working installations of:
1. python 3.7
2. docker
3. docker-compose
4. npm


## Getting started

The docker-compose file and Dockerfile will setup a postgres instance locally running the code currently in the backend.

1. `docker-compose up --build -d` -> start and build the services
2. `docker-compose exec database createdb -U postgres president_db` -> create the database in the database cluster. The password is `postgres`
3. `docker-compose exec speech-app python start.py` -> create the tables in the database according to the current model
4. in the speech-viewer directory run `npm i`
5. `npm start` will then launch the development webserver


## Objectives.
You have two tasks in this exercise:

1. Populate the database. Included in this repo is an archive of speeches given by american presidents. You need to first design a pipeline which will extract the file and sentence number (0-based) for all mentions of climate change, clean energy, green movements etc.
You are encouraged to use NLP techniques to help this extraction process. e.g. NLTK, Spacy, Gensim etc.

2. Visualise the data. Once you have a set of matches in the database you need to augment the front end app with:
	1. Some form of data visualiation, at the very least a histogram of president: frequency of matches. Bonus marks for more inventive displays!
	2. Click through to source: update the table such that any row can be selected to show the match in the context of the file it was found.

You are free to edit any of the source files, install additional libraries etc as you see fit.


## Assessment

You will be assessed on the quality of the code. We are looking for clear and expressive code which communicates its intent. Comments can be used, but should be used sparingly. Think about the performance of any algorithms you write and the appropriateness of any datastructures you choose to implement or use. Code should be idiomatic for the two different languages. The overall styling of the front end application will not be judged, but an appreciation of usability and the UX is definately encouraged.
