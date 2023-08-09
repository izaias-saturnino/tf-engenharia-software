import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";
import AccountForm from "../components/AccountForm";
import UpperMenu from "../components/UpperMenu.js"
import EventsList from "../components/EventsList.js";

const Content = (props) => {
    return (
        <div>
            <UpperMenu/>
            <EventsList/>

            <div className="bar">
                <div className="bar-a"/>
                <div className="bar-b"/>
                <div className="bar-c"/>
            </div>
        </div>
    )
}

const Home = (props) => {

    const state = { ...localStorage };
    //const state = {username: "user", utype: "cozinha solidária", validatedKitchen: true};

    const navigate = useNavigate();

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    // if (state.username === undefined) {
    //     return <Login/>;
    // }

    return (
        <div className="app">
            <div className="p-10">
                <div className="screen-area"><Content state={state} /></div>
            </div>
        </div>
    )
};

export default Home;