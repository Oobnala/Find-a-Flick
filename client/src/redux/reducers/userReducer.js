import {
  SIGN_OUT,
  LOGIN,
  LOAD_COOKIE,
  ADD_TO_WATCHLIST,
  DELETE_FROM_WATCHLIST,
  LOAD_WATCHLIST,
  SET_AUTH_STATUS,
  REGISTER
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  userId: null,
  authStatus: {},
  watchlist: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
        watchlist: action.payload.watchlist,
        authStatus: { valid: action.payload.valid }
      };
    case REGISTER:
      return {
        ...state,
        authStatus: { valid: action.payload.valid }
      };
    case SIGN_OUT:
      return { ...state, isLoggedIn: false, userId: null, watchlist: [] };
    case LOAD_COOKIE:
      return { ...state, isLoggedIn: true, userId: action.payload };
    case ADD_TO_WATCHLIST:
      return { ...state, watchlist: action.payload };
    case DELETE_FROM_WATCHLIST:
      return { ...state, watchlist: action.payload };
    case LOAD_WATCHLIST:
      return { ...state, watchlist: action.payload };
    case SET_AUTH_STATUS:
      return { ...state, authStatus: action.payload };
    default:
      return state;
  }
};
