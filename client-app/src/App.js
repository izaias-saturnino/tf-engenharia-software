import React from "react";

import "./styles.css";

import Router from "./routes";

function App() {

  return (
    <Router/>
  );

  //TO DO
  //add home button to all pages
  //add logout function to all pages
  //add authentication verification to all pages that require authentication to view
}

export default App;

export const backend_base_url = "https://elknoblich2.sa-1.sharedwithexpose.com";