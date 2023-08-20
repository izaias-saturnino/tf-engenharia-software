import React from "react";

import UpperMenu from "../components/UpperMenu.js"
import EventsList from "../components/EventsList.js";
import { Navigate } from "react-router-dom";

const Content = (props) => {
    return (
        <div className="default-page-content-size">
            <EventsList/>
        </div>
    )
}

const Home = () => {
    const state = { ...localStorage };

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

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