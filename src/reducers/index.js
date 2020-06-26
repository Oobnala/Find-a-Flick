import { combineReducers } from 'redux';
import popularMovieReducer from './popularMovieReducer';
import searchMovieReducer from './searchMovieReducer';

export default combineReducers({
  popularMovies: popularMovieReducer,
  search: searchMovieReducer
});
