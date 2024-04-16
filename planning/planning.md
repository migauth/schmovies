# Planning Steps

Movie App inspo: https://www.movierankings.net/
Tmdb – movie db API: https://developer.themoviedb.org/reference/intro/getting-started
 
# User Stories

- As a visitor, I want to be able to see a list of movies on the homepage
- As a visitor, I want to be able to search through the movie database
- As a visitor, I want to be able to select a movie and read a description
- As a visitor, I want to be able to take the quiz to see which movie is recommended to me based on my mood and preferences.
- As an authenticated user, I want to see my list of favourited movies
- As an authenticated user, I want to be able to rate movies
- As a visitor, I want to be able to take the movie quiz


# Resources (nouns from user stories)
User, movie, quizes, favourites


# ERD
(in google doc - turn into a visual with draw.io?)

# Relationships
Users to Movies: A many-to-many relationship through the Favourites table. A user can favourite multiple movies, and a movie can be favourited by multiple users.
Users to Quizzes: A many-to-many relationship through the UserQuizResults table. A user can take multiple quizzes, and a quiz can be taken by multiple users.
Movies to Ratings: A one-to-many relationship. A movie can have multiple ratings from different users, but each rating is associated with only one movie.
 
- Routes
- Wireframe
- Set up GitHub Together
- Set up the Project Structure and Naming Conventions Together
- Decide on Workflow and Tasks
- Each pick a task and work on it from start to finish, including backend, frontend, everything.
- Maybe leave most styling to the end once functionality is complete.
- Decide on Communication
- Through discord? Have a little chat (even if it’s just through messages, doesn’t have to be video calls every day) once a day to just update each other. I heard Github has a good tool, similar to a Trello board where we can project plan and keep on track of tasks and who’s doing what.
 

