const reduceUser = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_APP':
        return action.user;
      default:
        return state;
    }
};

export default reduceUser;