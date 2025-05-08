// Fallback movie data to use when API is unavailable
const fallbackMovies = [
  // 2024 movies for the "New Releases" section
  {
    id: 101,
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    genre: "Science Fiction, Adventure",
    release_year: "2024",
    poster_url: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
  },
  {
    id: 102,
    title: "Kingdom of the Planet of the Apes",
    description: "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past.",
    genre: "Science Fiction, Adventure",
    release_year: "2024",
    poster_url: "https://image.tmdb.org/t/p/w500/gVCqOhD8vUJoXoJb05jYJLVA2cd.jpg"
  },
  {
    id: 103,
    title: "The Fall Guy",
    description: "A stuntman is hired to work on a film directed by his ex-girlfriend and the star he was a stunt double for in the past. Things take a turn when the star goes missing.",
    genre: "Action, Comedy",
    release_year: "2024",
    poster_url: "https://image.tmdb.org/t/p/w500/xXBg6NXV1OJpjnUOw41RjnpP526.jpg"
  },
  {
    id: 104,
    title: "Inside Out 2",
    description: "Joy, Sadness, Anger, Fear and Disgust are joined by new emotions as Riley enters adolescence.",
    genre: "Animation, Comedy, Family",
    release_year: "2024",
    poster_url: "https://image.tmdb.org/t/p/w500/4KHchupuz4euygJ9MnjlZmRyStM.jpg"
  },
  {
    id: 105,
    title: "Godzilla x Kong: The New Empire",
    description: "Godzilla and the mighty Kong face a colossal threat hidden deep within the planet, challenging their very existence and the survival of the human race.",
    genre: "Action, Science Fiction",
    release_year: "2024",
    poster_url: "https://image.tmdb.org/t/p/w500/bQ2ygkiKhDuynJFrfGJ8G01nNG2.jpg"
  },
  
  // Classic movies for the "Popular Movies" section
  {
    id: 1,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    release_year: "1994",
    poster_url: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
  },
  {
    id: 2,
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: "Crime, Drama",
    release_year: "1972",
    poster_url: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action, Crime, Drama",
    release_year: "2008",
    poster_url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: "Crime, Drama",
    release_year: "1994",
    poster_url: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Return of the King",
    description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    genre: "Adventure, Fantasy, Action",
    release_year: "2003",
    poster_url: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"
  },
  {
    id: 6,
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    genre: "Drama, Romance",
    release_year: "1994",
    poster_url: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
  },
  {
    id: 7,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: "Action, Science Fiction",
    release_year: "2010",
    poster_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 8,
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    genre: "Action, Science Fiction",
    release_year: "1999",
    poster_url: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  }
];

export default fallbackMovies;