const reducePreloader = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PRELOADER':
        return action.isLoaded;
      default:
        return state;
    }
};

export default reducePreloader;