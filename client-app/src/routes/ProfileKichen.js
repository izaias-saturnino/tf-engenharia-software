import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login";
import ProfileProp from "../components/ProfileProp";

import defaultProfilePic from '../images/default-profile-picture.png';
import fetchContent from "../gets/Fetch";
import { backend_base_url } from "../App";
import UpperMenu from "../components/UpperMenu";

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

const updateResults = (setResults, content) =>{
    var results = [];
    if(content !== undefined){
        for (var i = 0; i < content.length; i++) {
            results.push(<Event className={"default-border-bottom"} event={content[i]}/>);
        }
    }
    if(content.length === 0){
        results.push(<div className="pt-3">Fim dos resultados.</div>);
    }
    return results;
}

const ProfileKitchen = (props) => {
    const {kitchen} = useParams();
    const [results, setResults] = useState([]);
    const [profile, setProfile] = useState({});

    fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen, 'POST',
    (data)=>{
        setResults(updateResults(data.events));
        setProfile(data.kitchen);
    });

    return (
        <div>
            <UpperMenu/>
            <div className="app">
                <div className="py-10">
                    <div className="kitchen-profile justify-text min-w-100">
                        <div>
                            <img className="w-100 h-50" src={defaultProfilePic}></img>
                            <div className="p-2rem">
                                <div className="title">{profile.Nome}</div>
                                <div className="profile-properties">
                                    <ProfileProp propName={"Email"} propValue={profile.Email}/>
                                    <ProfileProp propName={"Telefone"} propValue={profile.Telefone}/>
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