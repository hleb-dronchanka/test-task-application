import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as serialize from 'form-serialize';
import classNames from 'classnames';


import Preloader from "../Preloader";
import FormInput from "../FormInput";
import { getUser } from '../../actions/';

import './Auth.scss';

function Borders() {
  return(
    <>
      <div className="left-top"><span className="border"></span><span className="border"></span></div>
      <div className="right-top"><span className="border"></span><span className="border"></span></div>
      <div className="left-bottom"><span className="border"></span><span className="border"></span></div>
      <div className="right-bottom"><span className="border"></span><span className="border"></span></div>
    </>
  );
}


class Auth extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isLoaded: true,
      success: true,
      formData: {
        email: {
          value: '',
          error: false,
          type: 'email',
          text: 'Enter e-mail',
          // validation: 3,
        },
        password: {
          value: '',
          error: false,
          type: 'password',
          text: 'Enter password',
          validation: 8,
        },
      },
    };

    this.error = 0;


    this.auth = props.auth;

    this.changeInput = this.changeInput.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);

  }

  emailValidation(string) {
    const emailTemplate = new RegExp('^[a-zA-z0-9_-]{2,}@[a-z]{2,}.[a-z]{2,3}$');
    return !(string.match(emailTemplate));
  }

  changeInput(el) {
    const formData = this.state.formData;
    formData[el.name].value = el.value;

    if(formData[el.name].type === 'text' || formData[el.name].type === 'password'){
      formData[el.name].error = (formData[el.name].value.length <= formData[el.name].validation);
    } else if(formData[el.name].type === 'email') {
      formData[el.name].error = this.emailValidation(el.value);
    }
    
    this.setState({
      formData: formData,
    });
  }

  submitFormHandler(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formFields = serialize(form);

    if(!this.error){
      this.props.dispatch(getUser(formFields));
    }
  }

  setStatus(result){
    if(!result.msg){
      return;
    }

    const statusClass = classNames({
        "form-status": true,
        error: (!result.status) ? "error" : "",
        success: (result.status) ? "success" : "",
    });

    return(
      <div className={statusClass}>
        <p>{result.msg}</p>
      </div>
    );

  }

  render() {

    if(this.props.auth){
        return (
            <Redirect to={{ pathname: "/" }}/>
        );
    }

    if(!this.state.isLoaded) {
      return (
        <Preloader />
      );
    }

    const formFieldsName = Object.getOwnPropertyNames(this.state.formData);
	  const authStatus = this.props.storeApp.reduceAuthStatus;
    return (
        <div className="content form-page">
          <div className="form">
            <Borders />
            <form className="form__auth" onSubmit={this.submitFormHandler}>
              <div className="form-line title">
                  <h3>Авторизация</h3>
                  <p>Для входа введите логин и пароль вашей учётной записи</p>
              </div>
              <div className="form-line input-line">
                  {this.setStatus(authStatus)}
              </div>
              {
                formFieldsName.map((item) => 
                  <FormInput 
                    type={this.state.formData[item]['type']} 
                    name={item} 
                    key={item}
                    require={this.state.formData[item]['validation'] > 0}
                    error={this.state.formData[item]['error']}
                    validation={this.state.formData[item]['validation']} 
                    title={this.state.formData[item]['text']}
                    placeholder={this.state.formData[item]['placeholder']}
                    change={this.changeInput}
                  />
                )
              }
              <div className="form-line input-line sbmt">
                <div className="input-submit">
                    <div className="btn border btn-blue">
                        <Borders />
                        <input type="submit" value="вход"/>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    reduceAuthStatus: state.reduceAuthStatus,
    reducePreloader: state.reducePreloader,
    storeApp: state
  }
};


export default connect(
  mapStateToProps
)(Auth);
