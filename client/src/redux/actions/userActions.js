import db from '../../apis/db';
import cookie from 'react-cookies';
import {
  REGISTER,
  SIGN_OUT,
  LOGIN,
  LOAD_COOKIE,
  ADD_TO_WATCHLIST,
  DELETE_FROM_WATCHLIST,
  LOAD_WATCHLIST
} from '../actions/types';

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
        const watchlist = JSON.parse(
          localStorage.getItem(`watchlist_${res.data.userId}`)
        );

        const user = {
          userId: res.data.userId,
          watchlist: watchlist
        };

        dispatch({ type: LOGIN, payload: user });
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
  console.log('Add to Watchlist action called');
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
  console.log('delete from watchlist hit');
  let watchlist = JSON.parse(
    localStorage.getItem(`watchlist_${getState().user.userId}`)
  );

  if (watchlist !== null) {
    let index = watchlist.findIndex(movie => movie.key === movieId, 1);
    console.log(index);
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
