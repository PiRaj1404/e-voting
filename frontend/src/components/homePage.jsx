import React from "react";
import logo from "../logo.svg";
import{NavLink} from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header className="App-header">
      <nav>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Your one vote can change the result!</p>
        <a
          className="App-link"
          href="/register"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cast IT
        </a>
      </header>
    </div>
  );
};

export default HomePage;
