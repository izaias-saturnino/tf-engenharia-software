import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login";

const Event = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO add link */}
            <div className="title2 link">
                {props.event.name}
            </div>
            <div className="search-item-properties">
                <div className="mb-3"></div>
                <div className="search-item-propertie">
                    Local: {props.event.location}
                </div>
                <div className="search-item-propertie">
                    Data: {props.event.date}
                </div>
                <div className="search-item-propertie">
                    Público esperado: {props.event.public}
                </div>
            </div>
        </div>
    )
}

const ProfileKitchen = (props) => {
    //fetch events
    let events = [];

    let results = [];
    let i = 0;
    if(events != undefined){
        for (i = 0; i < events.length; i++) {
            results.push(<Event className={"default-border-bottom"} event={events[i]}/>);
        }
    }

    let eventTest = {
        "name": "Evento promocional do filme Oppenheimer",
        "location": "Shopping Bourbon",
        "date": "24/09/2023",
        "public": "300 pessoas",
    };
    results.push(<Event className={"default-border-bottom"} event={eventTest}/>);

    if(props.search != undefined){
        if(events.length == 0){
            results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
        }
        else{
            results.push(<div className="pt-5">Fim dos resultados.</div>);
        }
    }

    //results.push(<div className="pt-5">Fim dos resultados.</div>);

    return (
        <div className="app">
            <div className="p-10">
                <div className="login-form">
                    <div>
                        <div className="title">{"Eventos"}</div>
                        <div>
                            <form className="main-form">
                                <div className="input-container">
                                    <input placeholder={"Filtrar"} type="text" name="search" />
                                </div>
                            </form>
                        </div>
                        <div className="search-results">
                            {results}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileKitchen;