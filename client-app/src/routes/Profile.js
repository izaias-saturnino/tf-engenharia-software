import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";
import defaultProfilePic from '../images/default-profile-picture.png';

const ProfileProp = (props) => {

    if(props.propValue == undefined){
        return;
    }
    if(props.img != undefined){
        //TODO
        return (
            <div className="profile-properties">
                <div className="gray-text">{props.propName}</div>
                <div>
                    {props.propValue}
                </div>
            </div>
        )
    }

    return (
        <div className="profile-properties">
            <div className="gray-text">{props.propName}</div>
            <div>
                {props.propValue}
            </div>
        </div>
    )
}

const Profile = (props) => {
    {/* TODO add backend integration to get profile info */}

    let state = { ...localStorage };

    //fetch user info
    state = {};
    state.profile = {
        "Nome": "Cozinha solidária",
        "Email": "cozinhasolidaria@gmail.com",
        "Telefone": "(99) 987654321",
        "Endereço": "Av. Bento Gonçalves, nº 999, Porto Alegre - RS",
        "CNPJ": "987654321",
        "utype": "kitchen",
    };
    //replace later

    if(state == undefined){
        return (<Login/>)
    }
    if(state.profile == undefined){
        if(state.username == undefined){
            return (<Login/>)
        }
        //fetch this user info and assign it to state.profile
    }
    return (
        <div className="app">
            <div className="p-10">
                <div className="login-form justify-text">
                    <div>
                        <div className="title">Perfil</div>
                        <div className="py-3 px-15">
                            <img className="w-100 rounded-border" src={defaultProfilePic}></img>
                        </div>
                        <div className="profile-properties">
                            <ProfileProp propName={"Nome"} propValue={state.profile.Nome}/>
                            <div className="profile-properties">
                                <div className="gray-text">Email</div>
                                <div>
                                    {state.profile.Email}
                                </div>
                            </div>
                            <div className="profile-properties">
                                <div className="gray-text">Telefone</div>
                                <div>
                                    {state.profile.Telefone}
                                </div>
                            </div>
                            {/* <div className="profile-properties">
                                <div className="gray-text">Site</div>
                                <div>
                                    <a className="link" href="https://cozinhasolidaria.com.br">cozinhasolidaria.com.br</a>
                                </div>
                            </div> */}
                            <ProfileProp propName={"Endereço"} propValue={state.profile.Endereço}/>
                            {state.profile.utype === "kitchen" ?
                                <ProfileProp propName={"CNPJ"} propValue={state.profile.CNPJ}/>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;