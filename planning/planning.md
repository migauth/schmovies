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
  
8. Movie Quiz (For Visitors)
  - Implement a separate movie quiz for visitors who want a recommendation without signing up.
  - This quiz should function similarly to the one for authenticated users.


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
