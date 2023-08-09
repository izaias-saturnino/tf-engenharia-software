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

export const backend_base_url = "https://3b54-2804-14d-4c85-1043-5966-90fc-e354-18fa.ngrok-free.app";