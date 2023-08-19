import React from "react";

import UpperMenu from "../components/UpperMenu.js"
import EventsList from "../components/EventsList.js";

const Content = (props) => {
    return (
        <div className="default-page-content-size">
            <EventsList/>
        </div>
    )
}

const Home = () => {
    const state = { ...localStorage };

    // if (state.username === undefined) {
    //    return (<Navigate to="/" replace />)
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