export const register = formProps => async dispatch => {
  console.log('Register action called');
  console.log(formProps);
};

export const login = formProps => async dispatch => {
  console.log('login action called');
  console.log(formProps);
};
