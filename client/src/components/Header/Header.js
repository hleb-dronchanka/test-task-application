import React from 'react';
import { Link } from "react-router-dom";
import HeaderPersonal from "./HeaderPersonal";


import './Header.scss';


function Header(props) {
  return (
    <header>
        <div className="header">
          <nav className="menu">
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
          <HeaderPersonal auth={props.auth} user={props.user}/>
        </div>
    </header>
  );
    
}
  
  export default Header;