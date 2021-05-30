import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { logoutApp } from '../../actions/';

import './HeaderPersonal.scss';




function AuthTrue(props) {

    const logoutUser = () => {
        props.componentProps.dispatch(logoutApp(false));
    }

    return (
        <div className="personal">
            <div className="user-data">
                {props.user.email}
            </div>
            <ul>
                <li onClick={logoutUser}>logout</li>
            </ul>
        </div>
    );
}

function AuthFalse() {
    return (
        <div className="personal">
            <ul>
                <li><Link to="/login">Sign in</Link></li>
                <li><Link to="/registration">Sign up</Link></li>
            </ul>
        </div>
    );
}

function HeaderPersonal(props) {
    return (
        (props.auth) ? <AuthTrue user={props.user} componentProps={props}/> : <AuthFalse />
    );
}

const mapStateToProps = state => {
    return {
      storeApp: state
    }
  };
  
  
  export default connect(
    mapStateToProps
  )(HeaderPersonal);
