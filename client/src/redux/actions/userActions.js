import db from '../../apis/db';
import cookie from 'react-cookies';
import { REGISTER, SIGN_OUT, LOGIN, LOAD_COOKIE } from '../actions/types';

export const register = formProps => async dispatch => {
  console.log('Register action called');
  db.post('user/register', formProps)
    .then(res => {
      if (res.data.valid) {
        dispatch({ type: REGISTER, payload: res.data });
      }
    })
    .catch(err => console.log(err));
};

export const login = formProps => async dispatch => {
  console.log('login action called');
  db.post('user/login', formProps)
    .then(res => {
      if (res.data.valid) {
        dispatch({ type: LOGIN, payload: res.data });
        cookie.save('userId', res.data.userId, { path: '/' });
      }
    })
    .catch(err => console.log(err));
};

export const signOut = () => async dispatch => {
  cookie.remove('userId', { path: '/' });
  dispatch({ type: SIGN_OUT });
};

export const loadCookie = () => async dispatch => {
  if (cookie.load('userId')) {
    console.log('Cookie action called and loaded');
    dispatch({ type: LOAD_COOKIE, payload: cookie.load('userId') });
  }
};

export const addToWatchlist = movieId => dispatch => {
  console.log('Add to Watchlist action called');
  console.log(movieId);
};
