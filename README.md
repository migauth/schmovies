

!["Schmovies logo"](https://github.com/migauth/schmovies/blob/main/frontend/public/images/github-logo.png?raw=true)


# A Movie Suggestion App

## Stack

ReactJS, Django, PostgreSQL

## Screenshots

Homepage

![Screenshot of home page](/frontend/public/images/Schmovies_home.png)

Browse through our movie categories:

![Screenshot of new releases](/frontend/public/images/Schmovies_new_releases.png)

Or take the quiz to find out which is the perfect movie for you to watch!

![Screenshot of quiz](/frontend/public/images/Schmovies_quiz.png)

## How to setup

Clone this repo

# Install and run virtual environment

Make sure you have Django installed:

```
pip3 install django
```

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
pip3 install requests
```

## Installed frontend dependancies

```
cd frontend
npm install sass
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
npm install --save @fortawesome/react-fontawesome
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

## Contributers

- Michael Gauthier [migauth](https://github.com/migauth)
- Charli Steketee [Charlisteketee](https://github.com/Charlisteketee)
- Luiza Leao [lmleao](https://github.com/lmleao)