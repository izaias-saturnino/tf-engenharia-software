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
                            <ProfileProp propName={"Nome"} propValue={"Cozinha solidária"}/>
                            <div className="profile-properties">
                                <div className="gray-text">Email</div>
                                <div>
                                    cozinhasolidaria@gmail.com
                                </div>
                            </div>
                            <div className="profile-properties">
                                <div className="gray-text">Telefone</div>
                                <div>
                                    {"(99) 987654321"}
                                </div>
                            </div>
                            {/* <div className="profile-properties">
                                <div className="gray-text">Site</div>
                                <div>
                                    <a className="link" href="https://cozinhasolidaria.com.br">cozinhasolidaria.com.br</a>
                                </div>
                            </div> */}
                            <ProfileProp propName={"Endereço"} propValue={"Av. Bento Gonçalves, nº 999, Porto Alegre - RS"}/>
                            {/* TODO add backend integration to get profile info */}
                            {true || props.state.profile_utype === "kitchen" ?
                                <ProfileProp propName={"CNPJ"} propValue={"987654321"}/>
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