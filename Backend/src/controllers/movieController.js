import moviesModel from "../models/moviesModel.js";

const getMovies = async (req, res) => {
  try {
    const movies = await moviesModel.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getMoviesById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await moviesModel.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTheater = async (req, res) => {
  try {
    const movies = await moviesModel.find();
    let theaters = [];

    // Iterate through each movie
    movies.forEach((movie) => {
      // Iterate through theaters of each movie and push them into the theaters array
      movie.theater.forEach((theater) => {
        theaters.push({
          movieTitle: movie.title,
          theaterName: theater.name,
          date: theater.date,
          ticketPrice: theater.ticketPrice,
          id: theater.id,
        });
      });
    });

    // Send theaters array as response
    res.status(200).json(theaters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addMovies = async (req, res) => {
  const movie = req.body;

  const newMovie = new moviesModel({
    title: movie.title,
    duration: movie.duration,
    releaseDate: movie.releaseDate,
    language: movie.language,
    imageUrl: movie.imageUrl,
    theater: [],
  });

  try {
    // Saving the new movie to the database
    await newMovie.save();

    // Sending a successful response with the newly added movie details
    res.status(201).json(newMovie);
  } catch (error) {
    // Handling errors and sending an appropriate response
    res.status(409).json({ message: error.message });
  }
};

const addTheaterToMovie = async (req, res) => {
  const  movieId  = req.body.movies;
  const theaterData = {
    name: req.body.name,
    date: req.body.date,
    ticketPrice: req.body.ticketPrice
  };
 
  try {
    

    const movie = await moviesModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update the movie with the new theater information
    movie.theater.push(theaterData);
    await movie.save();

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getMovies, addMovies, addTheaterToMovie, getMoviesById, getTheater };
