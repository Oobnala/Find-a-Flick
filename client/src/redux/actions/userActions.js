import server from '../../apis/server';
import cookie from 'react-cookies';
import {
  REGISTER,
  SIGN_OUT,
  LOGIN,
  LOAD_COOKIE,
  ADD_TO_WATCHLIST,
  DELETE_FROM_WATCHLIST,
  LOAD_WATCHLIST,
  SET_AUTH_STATUS
} from '../actions/types';

export const register = formProps => async dispatch => {
  const response = await server.post('user/register', formProps);
  if (response.data.valid) {
    dispatch({ type: REGISTER, payload: response.data });
  } else {
    dispatch({ type: SET_AUTH_STATUS, payload: response.data });
  }
};

export const login = formProps => async dispatch => {
  const response = await server.post('user/login', formProps);

  if (response.data.valid) {
    const watchlist = JSON.parse(
      localStorage.getItem(`watchlist_${response.data.userId}`)
    );

    const user = {
      valid: response.data.valid,
      userId: response.data.userId,
      watchlist: watchlist
    };

    dispatch({ type: LOGIN, payload: user });
    cookie.save('userId', response.data.userId, { path: '/' });
  } else {
    dispatch({ type: SET_AUTH_STATUS, payload: response.data });
  }
};

export const signOut = () => async dispatch => {
  cookie.remove('userId', { path: '/' });
  dispatch({ type: SIGN_OUT });
};

export const loadCookie = () => async dispatch => {
  if (cookie.load('userId')) {
    dispatch({ type: LOAD_COOKIE, payload: cookie.load('userId') });
  }
};

export const loadWatchlist = () => async (dispatch, getState) => {
  let watchlist = await JSON.parse(
    localStorage.getItem(`watchlist_${getState().user.userId}`)
  );

  if (watchlist === null) {
    watchlist = [];
  }

  dispatch({ type: LOAD_WATCHLIST, payload: watchlist });
};

export const addToWatchlist = (id, poster_path, title) => (
  dispatch,
  getState
) => {
  let watchlist = JSON.parse(
    localStorage.getItem(`watchlist_${getState().user.userId}`)
  );

  if (watchlist === null) {
    watchlist = [];
  }

  let date = new Date();
  let month = date.toLocaleString('default', { month: 'long' });
  let day = date.getDate() + 1;
  let year = date.getFullYear();
  let releaseDate = month + ' ' + day + ', ' + year;

  const newMovie = {
    key: id,
    poster_path: poster_path,
    title: title,
    date: releaseDate
  };

  watchlist.push(newMovie);

  localStorage.setItem(
    `watchlist_${getState().user.userId}`,
    JSON.stringify(watchlist)
  );

  dispatch({ type: ADD_TO_WATCHLIST, payload: watchlist });
};

export const deleteFromWatchlist = movieId => (dispatch, getState) => {
  let watchlist = JSON.parse(
    localStorage.getItem(`watchlist_${getState().user.userId}`)
  );

  if (watchlist !== null) {
    let index = watchlist.findIndex(movie => movie.key === movieId, 1);
    if (index > -1) {
      watchlist.splice(index, 1);
      localStorage.setItem(
        `watchlist_${getState().user.userId}`,
        JSON.stringify(watchlist)
      );
    }

    dispatch({ type: DELETE_FROM_WATCHLIST, payload: watchlist });
  }
};
