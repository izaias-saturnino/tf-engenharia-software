import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";
import KitchenHome from "../components/KitchenHome";
import UpperMenu from "../components/UpperMenu.js"
import EventsList from "../components/EventsList.js";

const Content = (props) => {
    return (
        <div>
            <UpperMenu/>
            {props.state.utype === "cozinha solidária" && (
            <KitchenHome state={props.state}/>)}
            {props.state.utype === undefined && (
            <EventsList/>)}
        </div>
    )
}

const Home = (props) => {

    //localStorage.setItem("username", "user");
    //localStorage.setItem("utype", "cozinha solidária");
    //localStorage.setItem("username", "Cozinha Solidária");
    //localStorage.setItem("validatedKitchen", true);
    const state = { ...localStorage };
    //const state = {username: "user", utype: "cozinha solidária", validatedKitchen: true};
    //const //state = {username: "user", userType: "doador"};

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
            </div>
                <div className="screen-area"><Content state={state} /></div>
        </div>
    )
};

export default Home;