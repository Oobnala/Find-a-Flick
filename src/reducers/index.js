import { combineReducers } from 'redux';
import popularMovieReducer from './popularMovieReducer';
import searchMovieReducer from './searchMovieReducer';
import movieDetailsReducer from './movieDetailsReducer';

export default combineReducers({
  popular: popularMovieReducer,
  search: searchMovieReducer,
  movie: movieDetailsReducer
});
