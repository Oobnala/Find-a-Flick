import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import moviesReducer from './moviesReducer';
import movieDetailsReducer from './movieDetailsReducer';

export default combineReducers({
  movies: moviesReducer,
  movie: movieDetailsReducer,
  form: formReducer
});
