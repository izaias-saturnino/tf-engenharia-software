import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";
import UpperMenu from "../components/UpperMenu.js"
import EventsList from "../components/EventsList.js";

const Content = (props) => {
    return (
        <div className="default-page-content-size">
            <EventsList/>
        </div>
    )
}

const Home = (props) => {
    const state = { ...localStorage };

    const navigate = useNavigate();

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    // if (state.username === undefined) {
    //     return <Login/>;
    // }

    return (
        <div>
            <UpperMenu/>
            <div className="app">
                <Content state={state} />
            </div>
        </div>
    )
};

export default Home;