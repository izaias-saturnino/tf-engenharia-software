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

export const backend_base_url = "https://77f3-2804-14d-4c85-1043-aa26-768b-c743-3dc.ngrok-free.app";