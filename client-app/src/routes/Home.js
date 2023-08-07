import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";
import AccountForm from "../components/AccountForm";

const events = [
    { title: "Event 1", content: "Event 1 description" },
    { title: "Event 2", content: "Event 2 description" },
    { title: "Event 3", content: "Event 3 description" },
    { title: "Event 4", content: "Event 4 description" },
    { title: "Event 5", content: "Event 5 description" },
    { title: "Event 6", content: "Event 6 description" },
    { title: "Event 7", content: "Event 7 description" },
    { title: "Event 8", content: "Event 8 description" },
    { title: "Event 9", content: "Event 9 description" },
    { title: "Event 10", content: "Event 10 description" },
]

const Content = (props) => {
    return (
        <div>
            <div>Usuário {props.state.username} logado com sucesso.</div>
            <div>Usuário logado como {props.state.utype}.</div>
            {!props.state.validatedKitchen && props.state.utype === "cozinha solidária" ? (
                <div>Seu cadastro ainda não foi validado.</div>
            ) : (
                <div></div>
            )}
            {props.state.validatedKitchen && props.state.utype === "cozinha solidária" ? (
                <div>Seu cadastro está validado.</div>
            ) : (
                <div></div>
            )}
            <div className="event-list-container">
            {events.map((event, index) => (
                <EventCard
                key={index}
                title={event.title}
                content={event.content}
                />
            ))}
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

    if (state.username === undefined) {
        return <Login/>;
    }

    return (
        <div className="app">
            <div className="p-10">
                <AccountForm title={"Home"} content={<Content state={state} />} />
            </div>
        </div>
    )
};

const EventCard = ({ title, content }) => {
    return (
        <div className="event-card-container">
            <div className="event-card-title">{title}</div>
            <div className="event-card-content">{content}</div>
        </div>
    )
}

export default Home;