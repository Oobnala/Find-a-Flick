const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tmdb = require('./apis/tmdb.js');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/user_routes');

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('We are on home');
});

// tmdb
const key = process.env.TMDB_API_KEY;

app.post('/tmdb/fetchMovies', async (req, res) => {
  console.log('fetch movies');
  if (req.body.term === '') {
    const response = await tmdb.get(
      `movie/popular?api_key=${key}&language=en-US&page=${req.body.page}`
    );
    const data = {
      page: req.body.page,
      term: '',
      totalResults: response.data.total_results,
      popularMovies: response.data.results
    };
    return res.send(data);
  } else {
    const response = await tmdb.get(
      `search/movie?api_key=${key}&language=en-US&query=${req.body.term}&page=${req.body.page}`
    );
    const data = {
      page: req.body.page,
      term: req.body.term,
      movies: response.data.results,
      totalResults: response.data.total_results
    };
    return res.send(data);
  }
});

app.get('/tmdb/getCarouselBackdrops', async (req, res) => {
  console.log('get carousel backdrops');
  const response = await tmdb.get(
    `movie/popular?api_key=${key}&language=en-US&page=${1}`
  );
  const data = {
    carousel: response.data.results.slice(0, 5)
  };
  res.send(data);
});

app.post('/tmdb/getMovieDetails', async (req, res) => {
  console.log('get movie details');
  const movieDetailsResponse = await tmdb.get(
    `movie/${req.body.movieId}?api_key=${key}&language=en-US`
  );

  const castDetailsResponse = await tmdb.get(
    `movie/${req.body.movieId}/credits?api_key=${key}`
  );

  const similarMovies = await tmdb.get(
    `movie/${req.body.movieId}/similar?api_key=${key}&language=en-US&page=1`
  );

  const directors = castDetailsResponse.data.crew
    .filter(crew => crew.job === 'Director')
    .map(director => director.name);

  const data = {
    movieId: req.body.movieId,
    movieDetails: movieDetailsResponse.data,
    castDetails: castDetailsResponse.data.cast,
    similarMovies: similarMovies.data.results,
    directors: directors
  };

  res.send(data);
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to db');
  }
);

app.listen(3001);
