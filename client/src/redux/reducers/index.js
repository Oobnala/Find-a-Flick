import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import movieDetailsReducer from './movieDetailsReducer';

export default combineReducers({
  movies: moviesReducer,
  movie: movieDetailsReducer
});
