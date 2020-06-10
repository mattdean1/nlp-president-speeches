# NP Tech test


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
