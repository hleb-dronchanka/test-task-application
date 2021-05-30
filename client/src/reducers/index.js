import { combineReducers } from 'redux';
import reduceAuth from './Auth';
import reduceRegStatus from './RegStatus';
import reduceAuthStatus from './AuthStatus';
import reduceUser from './User';
import reducePreloader from './Preloader';


export default combineReducers({
    reduceAuth,
    reduceRegStatus,
    reduceAuthStatus,
    reduceUser,
    reducePreloader,
});
