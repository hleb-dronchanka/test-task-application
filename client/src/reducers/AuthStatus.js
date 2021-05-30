const reduceAuthStatus = (state = {}, action) => {
    switch (action.type) {
      case 'SET_AUTH_STATUS':
        return action.result;
      default:
        return state;
    }
};

export default reduceAuthStatus;