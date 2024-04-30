# Schmovies planning notes

## MVP

Schmovies will feature a homepage displaying a list of movies, accompanied by a search bar for easy navigation. Visitors can click on movies to view descriptions and take a movie recommendation quiz based on mood and preferences. Authenticated users gain access to additional features, including the ability to view and rate movies, as well as maintain a list of favorited films. Both visitors and authenticated users can participate in a movie quiz to receive tailored recommendations.

1. Homepage with a List of Movies
  - Display a simple homepage with a list of movies.
  - Each movie item should at least have a title and maybe a small image.

2. Movie Description
  - Clicking on a movie title in the list should open a modal or a new page displaying the movie's description.

3. Movie Recommendation Quiz (For Visitors)
  - Develop a basic movie recommendation quiz.
  - The quiz should ask questions related to mood and preferences.
  - Based on the answers, suggest a movie from the database.

4. User Authentication
  - Implement a basic authentication system.
  - Users can sign up and log in to the platform.

5. Favorite Movies List (For Authenticated Users)
  - Authenticated users should have a page where they can view their list of favorited movies.
  - Users should be able to add or remove movies from their favorites list.
  
6. (Stretech) Search Functionality
  - Implement a search bar on the homepage to allow visitors to search through the movie database.
  - Search functionality should filter movies based on title or other relevant criteria.

7. (Stretech) Movie Rating (For Authenticated Users)
  - Authenticated users should be able to rate movies.
  - Ratings should be stored and displayed alongside movie details.
  
## Inspiration

Movie App inspo: https://www.movierankings.net/
Tmdb – movie db API: https://developer.themoviedb.org/reference/intro/getting-started
 
## User Stories

- As a visitor, I want to be able to see a list of movies on the homepage
- As a visitor, I want to be able to search through the movie database
- As a visitor, I want to be able to select a movie and read a description
- As a visitor, I want to be able to take the quiz to see which movie is recommended to me based on my mood and preferences.
- As an authenticated user, I want to see my list of favourited movies
- As an authenticated user, I want to be able to rate movies
- As a visitor, I want to be able to take the movie quiz


## Resources (nouns from user stories)
User, movie, quizes, favourites


## ERD
(in google doc - turn into a visual with draw.io?)

## Relationships
Users to Movies: A many-to-many relationship through the Favourites table. A user can favourite multiple movies, and a movie can be favourited by multiple users.
Users to Quizzes: A many-to-many relationship through the UserQuizResults table. A user can take multiple quizzes, and a quiz can be taken by multiple users.
Movies to Ratings: A one-to-many relationship. A movie can have multiple ratings from different users, but each rating is associated with only one movie.
 
- Routes
- Wireframes 
- ~~Set up GitHub Together~~
- Set up the Project Structure and Naming Conventions Together
- Decide on Workflow and Tasks
- Each pick a task and work on it from start to finish, including backend, frontend, everything.
- Maybe leave most styling to the end once functionality is complete.
- Decide on Communication
- Through discord? Have a little chat (even if it’s just through messages, doesn’t have to be video calls every day) once a day to just update each other. I heard Github has a good tool, similar to a Trello board where we can project plan and keep on track of tasks and who’s doing what.
- Desktop / mobile
- tailwind?
- Proposed stack: React, Django, Postgres, Tailwind?, ML?
 
## Notes from mentors

- ~~fix readme~~

- ~~consilidate MovieListAPIView point to one endpoint~~

- (optional because we're using the api and not really using a db for movies?)  Change the name of MovieListAPIView view to be 'MovieListCreateView' and create another view like 'GetMoviesView' that divides it into two separate tasks. List view should be pulling data out of your data base and sending the front end a list. You've made a MovieListAPIView which is GETting, UPDATING and/or CREATEing. These should all be different endpoints 

- (I think this is the important one) you probably will need an id field on your Movie model. all our models looks like this:

class Address(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

- (not sure this matters since the data from the api looks ok?) address bad data in your Movie model (like if the api doesn't send a description or a poster_url) you should set up your field with a default value like

description = models.CharField(max_length=2, default="")

which will insert an empty string (rather than a None)

- Also i'd change the release_year field to be a charfield as well and leave the year as a string, rather than a number. For the default reason, if it's not populated you can set it as an empty string rather than a 0 or None which can make filtering more confusing if that's a goal

- i would hesitate to use empty string as the path for the endpoint where you load the data. i'm pretty sure any endpoint hit that doesn't register will default down to that so you may end up hitting that unintentionally. recommend giving it some kind of label like 

path('load-db/', MovieListCreateView.as_view(), name='movie-list-create'),

and then also 

path('fetch-all-movies/', GetMovieListView.as_view(), name='get-all-movies')