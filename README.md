# Schmovies

## Description

Schmovies is a movie suggestion generation app.

## Install and run virtual environment

Install virtualenv (if you haven't already):
```
pip3 install virtualenv
```
Then:
```
cd schmovies

virtualenv -p python3 venv

source venv/bin/activate
```

## Installed backend dependancies
```
pip3 install psycopg2-binary
pip3 install python-decouple
pip3 install djangorestframework
pip3 install django-cors-headers
pip3 install python-dotenv
python3 -m pip install requests
```

## Installed backend dependancies

```
cd frontend
npm install sass
```


## Start backend server
```
cd src
python3 manage.py runserver
```

## Start frontend server
```
cd frontend
npm start
```

## Server links

http://127.0.0.1:8000/admin/

http://127.0.0.1:8000/api/movies/

http://127.0.0.1:8000/api/movies/?format=api