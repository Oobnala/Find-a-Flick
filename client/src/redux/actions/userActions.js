import db from '../../apis/db';
import { REGISTER, SIGN_OUT, LOGIN } from '../actions/types';

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
      }
    })
    .catch(err => console.log(err));
};

export const signOut = () => async dispatch => {
  dispatch({ type: SIGN_OUT });
};
