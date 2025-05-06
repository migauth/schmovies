

!["Schmovies logo"](https://github.com/migauth/schmovies/blob/main/frontend/public/images/github-logo.png?raw=true)


# Schmovies - The Movie Suggestion App

A movie database application with features like browsing movies, favorites, and personalized movie recommendations.

## Stack

- **Frontend**: ReactJS
- **Backend**: Django + Django REST Framework
- **Database**: PostgreSQL
- **API Integration**: TMDB (The Movie Database)
- **Containerization**: Docker

## Screenshots

Homepage

![Screenshot of home page](/frontend/public/images/Schmovies_home.png)

Browse through our movie categories:

![Screenshot of new releases](/frontend/public/images/Schmovies_new_releases.png)

Or take the quiz to find out which is the perfect movie for you to watch!

![Screenshot of quiz](/frontend/public/images/Schmovies_quiz.png)

## Local Development

### Option 1: Docker (Recommended)

1. Clone this repository:
```bash
git clone https://github.com/yourusername/schmovies.git
cd schmovies
```

2. Create a `.env` file in the root directory with the following variables:
```
# Database settings
DB_NAME=schmovies
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=postgres
DB_PORT=5432

# Django settings
SECRET_KEY=your_secret_key_here
DEBUG=True

# API Keys
TMDB_API_KEY=your_tmdb_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

3. Start the development environment:
```bash
docker-compose up -d
```

4. Populate the database with movies:
```bash
docker-compose exec backend python manage_movies.py populate
```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost/api/movies/movies/
   - Admin: http://localhost/admin

### Option 2: Local Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/schmovies.git
cd schmovies
```

2. Setup backend:
```bash
# Create and activate virtual environment
virtualenv -p python3 venv
source venv/bin/activate

# Install dependencies
cd src
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start backend server
python manage.py runserver
```

3. Setup frontend:
```bash
cd frontend
npm install
npm start
```

## Deployment

### Railway (Recommended for Free Tier)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Create a project on [Railway](https://railway.app):
   - Sign up/log in with GitHub
   - Create a new project
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Add environment variables from your `.env` file
   - Add the PostgreSQL plugin
   - Deploy!

### Render

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Use the `render.yaml` configuration
5. Add the necessary environment variables
6. Deploy the application

## Contributors

- Michael Gauthier [migauth](https://github.com/migauth)
- Charli Steketee [Charlisteketee](https://github.com/Charlisteketee)
- Luiza Leao [lmleao](https://github.com/lmleao)