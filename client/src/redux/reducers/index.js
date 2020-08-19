import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import moviesReducer from './moviesReducer';
import movieDetailsReducer from './movieDetailsReducer';
import userReducer from './userReducer';

export default combineReducers({
  movies: moviesReducer,
  movie: movieDetailsReducer,
  form: formReducer,
  user: userReducer
});
