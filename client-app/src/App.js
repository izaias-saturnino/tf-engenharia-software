import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import logo from './images/doaresLogo.png';
import defaultProfilePic from './images/default-profile-picture.png';

import Router from "./routes";

function App() {

  return (
    <Router/>
  );

  //TO DO
  //add home button to all pages
  //add logout function to all pages
}

export default App;