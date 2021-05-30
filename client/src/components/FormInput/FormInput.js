import React from 'react';
import classNames from 'classnames';


import './FormInput.scss';


class FormInput extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        inputError: this.props.error,
    }
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.props.change(e.currentTarget);
  }  

  render(){
    let validation = '';
    if(this.props.type === 'text'){
        validation = classNames({
            "input-field": true,
            error: (this.props.error) ? "error" : "",
        });
    }
    
    const reqField = (this.props.require) ? "*" : "";

    return (
        <div className="form-line input-line">
            <div className={validation}>
                <label>{this.props.title} {reqField}</label>
                <input onChange={this.changeHandler} type={this.props.type} name={this.props.name}/>
            </div>
        </div>
    );
  }
}


export default FormInput;