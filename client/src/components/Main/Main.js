import React from 'react';

import './Main.scss';


class Main extends React.Component {

    constructor(props){
      super(props);
    }
  
    render() {
      return (
        <div className="main-block">
            <div className="content">
              <h2>Welcome!</h2>
            </div>
        </div>
      );
    }
    
  }
  
  export default Main;