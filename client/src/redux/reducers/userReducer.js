import { SIGN_OUT, LOGIN } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, userId: action.payload.userId };
    case SIGN_OUT:
      return { ...state, isLoggedIn: false, userId: null };
    default:
      return state;
  }
};
