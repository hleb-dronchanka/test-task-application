const reduceRegStatus = (state = {}, action) => {
    switch (action.type) {
      case 'SET_REG_STATUS':
        return action.result;
      default:
        return state;
    }
};

export default reduceRegStatus;