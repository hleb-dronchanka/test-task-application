import Main from "./components/Main";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Registration from "./components/Registration";

import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';


import './App.scss';
import './reset.scss';

function App(props) {
	const authApp = props.storeApp.reduceAuth;
	const userApp = props.storeApp.reduceUser;

	return (
		<div className="root-block">
			<div className="bg">
				<div className="bg__wrap"><span className="nth1"></span><span className="nth2"></span><span className="nth3"></span><span className="nth4"></span><span className="nth5"></span></div>
			</div>
			<Header auth={authApp} user={userApp}/>
			<Switch>
				<Route exact path="/">
					<Main />
				</Route>
				<Route  path="/login">
					<Auth auth={authApp}/>
				</Route>
				<Route path="/registration">
					<Registration auth={authApp}/>
				</Route>
			</Switch>
		</div>
  	);
}

const mapStateToProps = state => {
	return {
		reduceAuth: state.reduceAuth,
		reduceUser: state.reduceUser,
		storeApp: state,
	}
};
  
export default connect(mapStateToProps)(App);
