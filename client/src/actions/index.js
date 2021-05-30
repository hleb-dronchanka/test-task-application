import axios from 'axios';

export const loginApp = (auth) => ({
    type: 'LOGIN_APP',
    auth,
});
  
export const logoutApp = (auth) => ({
    type: 'LOGOUT_APP',
    auth,
});

export const setUser = (user) => ({
    type: 'SET_USER_APP',
    user,
});

export const unsetUser = (user) => ({
    type: 'UNSET_USER_APP',
    user,
});

export const setRegStatus = (result) => ({
    type: 'SET_REG_STATUS',
    result,
});

export const setAuthStatus = (result) => ({
    type: 'SET_AUTH_STATUS',
    result,
});

export const setPreloader = (isLoaded) => ({
    type: 'SET_PRELOADER',
    isLoaded,
});

export const getUser = (form) => {
    return dispatch => {
        dispatch(setAuthStatus({}));
        dispatch(setPreloader(false));
        axios
            .post('http://localhost:3003/user', form)
            .then(res => {
                console.log(res.data.result);
                dispatch(loginApp(res.data.status));
                dispatch(setUser(res.data.user));
                dispatch(setPreloader(true));
                dispatch(setAuthStatus(res.data.result));
                
            })
            .catch(err => {
                console.log(err);
        });
    };
};

export const createUser = (form) => {

    return dispatch => {
        dispatch(setRegStatus({}));
        dispatch(setPreloader(false));

        axios
            .post('http://localhost:3003/user/create', form)
            .then(res => {
                console.log(res.data);
                dispatch(setRegStatus(res.data));
                dispatch(setPreloader(true));
                
            })
            .catch(err => {
                console.log(err);
        });
    };
};