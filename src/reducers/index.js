import { combineReducers } from 'redux';
import popularMovieReducer from './popularMovieReducer';
import searchMovieReducer from './searchMovieReducer';

export default combineReducers({
  popular: popularMovieReducer,
  search: searchMovieReducer
});
