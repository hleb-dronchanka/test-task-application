const reduceAuth = (state = {}, action) => {
    switch (action.type) {
      case 'LOGIN_APP':
        console.log('reduceFunc: ', action);
        return action.auth;
      case 'LOGOUT_APP':
        console.log('reduceFunc: ', action);
        return action.auth;
      default:
        return state;
    }
  };
  
  export default reduceAuth;