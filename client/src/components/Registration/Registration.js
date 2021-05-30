import React from 'react';
import { Redirect } from "react-router-dom";
import * as serialize from 'form-serialize';
import { connect } from 'react-redux';
import classNames from 'classnames';

import FormInput from "../FormInput";
import Preloader from "../Preloader";
import { createUser } from '../../actions/';


import './Registration.scss';

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

class Registration extends React.Component {

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
          validation: 3,
        },
        password: {
          value: '',
          error: false,
          type: 'password',
          text: 'Enter password',
          validation: 8,
        },
        confirmPassword: {
          value: '',
          error: false,
          type: 'password',
          text: 'Confirm password',
          validation: 8,
          ref: 'password'
        },
      },
    };

    this.auth = props.auth;

    this.changeInput = this.changeInput.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);

  }


  changeInput(el) {
    const formData = this.state.formData;
    formData[el.name].value = el.value;
    const ref = formData[el.name].ref;

    if(ref){
      formData[el.name].error = !(formData[el.name].value === formData[ref].value);
    } else {
      if(formData[el.name].type === 'text' || formData[el.name].type === 'password'){
        formData[el.name].error = (formData[el.name].value.length <= formData[el.name].validation);
      } else if(formData[el.name].type === 'email') {
        formData[el.name].error = this.emailValidation(el.value);
      }
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
      this.props.dispatch(createUser(formFields));
    }
  }

  emailValidation(string) {
    const emailTemplate = new RegExp('^[a-zA-z0-9_-]{2,}@[a-z]{2,}.[a-z]{2,3}$');
    return !(string.match(emailTemplate));
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

	  const preloader = this.props.storeApp.reducePreloader;


    if(!preloader) {
      return (
        <Preloader />
      );
    }

	  const regStatus = this.props.storeApp.reduceRegStatus;

    const formFieldsName = Object.getOwnPropertyNames(this.state.formData);
    return (
        <div className="content form-page">
            <div className="form">
                <Borders />
                <form className="form__auth" onSubmit={this.submitFormHandler}>
                    <div className="form-line title">
                        <h3>Регистрация</h3>
                        <p>Для использования личного кабинета необходимо пройти регистрацию.</p>
                    </div>
                    <div className="form-line input-line">
                        {this.setStatus(regStatus)}
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
                                <input type="submit" value="Регистрация"/>
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
    reduceRegStatus: state.reduceRegStatus,
    reducePreloader: state.reducePreloader,
    storeApp: state
  }
};


export default connect(
  mapStateToProps
)(Registration);