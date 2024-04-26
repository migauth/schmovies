# schmovies

## Install and run virtual environment
```
cd schmovies

virtualenv -p python3 venv

source venv/bin/activate
```

## Installed dependancies
- installed dependancy for postgres and python - pip install psycopg2-binary
- installed dependancy for env - pip install python-decouple
- installed django rest framework - pip install djangorestframework

- installed dependancy pip install django-cors-headers
- installed dependancy pip install python-dotenv
- installed dependancy python3 -m pip install requests

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