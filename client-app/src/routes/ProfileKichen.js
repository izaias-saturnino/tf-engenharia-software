import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login";
import Profile from "./Profile";
import ProfileProp from "../components/ProfileProp";

import defaultProfilePic from '../images/default-profile-picture.png';
import getProfileKitchen from "../gets/GetProfileKitchen";

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
    const {kitchen} = useParams();
    const state = { ...localStorage };

    //fetch profile
    var profile = {};

    profile = {
        "Nome": "Cozinha solidária",
        "Email": "cozinhasolidaria@gmail.com",
        //"Telefone": "(99) 987654321",
        //"Endereço": "Av. Bento Gonçalves, nº 999, Porto Alegre - RS",
        //"CNPJ": "987654321",
    };

    var kitchen_profile = getProfileKitchen(kitchen);
    var events = kitchen_profile.events;
    profile = kitchen_profile.kitchen;

    console.log(state.kitchen);
    console.log(state.events);

    profile.utype = "kitchen";

    let results = [];
    let i = 0;
    if(events !== undefined){
        for (i = 0; i < events.length; i++) {
            results.push(<Event className={"default-border-bottom"} event={events[i]}/>);
        }
    }

    // let eventTest = {
    //     "name": "Evento promocional do filme Oppenheimer",
    //     "location": "Shopping Bourbon",
    //     "date": "24/09/2023",
    //     "public": "300 pessoas",
    // };
    // results.push(<Event className={"default-border-bottom"} event={eventTest}/>);

    if(props.search !== undefined){
        if(events.length === 0){
            results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
        }
        else{
            results.push(<div className="pt-5">Fim dos resultados.</div>);
        }
    }
    if(events.length === 0){
        results.push(<div className="pt-3">Não há eventos disponíveis.</div>);
    }

    //results.push(<div className="pt-5">Fim dos resultados.</div>);

    return (
        <div>
            <div className="app">
                <div className="py-10">
                    <div className="kitchen-profile justify-text min-w-100">
                        <div>
                            <img className="w-100 h-50" src={defaultProfilePic}></img>
                            <div className="p-2rem">
                                <div className="title">Cozinha Solidária</div>
                                <div className="profile-properties">
                                    <ProfileProp propName={"Nome"} propValue={profile.Nome}/>
                                    <div className="profile-properties">
                                        <div className="gray-text">Email</div>
                                        <div>
                                            {profile.Email}
                                        </div>
                                    </div>
                                    <div className="profile-properties">
                                        <div className="gray-text">Telefone</div>
                                        <div>
                                            {profile.Telefone}
                                        </div>
                                    </div>
                                    <ProfileProp propName={"Endereço"} propValue={profile.Endereço}/>
                                    <ProfileProp propName={"CNPJ"} propValue={profile.CNPJ}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-8 px-10">
                        <div className="w-100 button-container button-font">
                            {/* TODO add link */}
                            <input type="submit" className="form-btn" value="Quero doar"/>
                        </div>
                    </div>
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
        </div>
    )
};

export default ProfileKitchen;