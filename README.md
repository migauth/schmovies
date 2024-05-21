

!["Schmovies logo"](https://github.com/migauth/schmovies/blob/main/frontend/public/images/github-logo.png?raw=true)

# Schmovies

## Description

Schmovies is a movie suggestion generation app. 

![Screenshot of home page](/frontend/public/images/Schmovies_home.png)

Browse through our movie categories:

![Screenshot of new releases](/frontend/public/images/Schmovies_new_releases.png)

Or take the quiz to find out which is the perfect movie for you to watch!

![Screenshot of quiz](/frontend/public/images/Schmovies_quiz.png)

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

## Font awesome
```
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
npm install --save @fortawesome/react-fontawesome
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