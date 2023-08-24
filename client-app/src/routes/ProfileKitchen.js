import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';

import defaultProfilePic from '../images/default-profile-picture.png';
import fetchContent from "../gets/Fetch";
import { backend_base_url } from "../App";
import UpperMenu from "../components/UpperMenu";

const Event = (props) => {
    const datePart = props.event.date.split("T")[0]; // Extrai a parte da data antes do "T"
    const reversedDate = datePart.split("-").reverse().join("/");
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
                {/* <div className="search-item-propertie">
                    Data: {props.event.date}
                </div> */}
                <div className="search-item-propertie">
                    Público esperado: {props.event.public}
                </div>
                <div className="search-item-propertie">
                    Data: {reversedDate}
                </div>
            </div>
        </div>
    )
}

const updateResults = (content) =>{
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

    const state = { ...localStorage };

    const {kitchen} = useParams();
    const [results, setResults] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(()=>{
        fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen, 'POST',
        (data)=>{
            console.log(data);
            setResults(updateResults(data.events));
            setProfile(data.kitchen);
        });
    }, [kitchen]);

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return (
        <div>
            <UpperMenu/>
            <div className="app">
                <div className="py-10">
                    <div className="kitchen-profile justify-text min-w-100">
                        <div>
                            <img className="w-100 h-50" src={defaultProfilePic}></img>
                            <div className="p-2rem">
                                <div className="title">{profile.name}</div>
                                <div className="profile-properties">
                                    <div>
                                        {profile.emailAddress}
                                    </div>
                                    <div>
                                    {profile.location}
                                    </div>
                                    <div>
                                    {profile.validated? "Cozinha validada." : "Cozinha ainda não validada."}
                                    </div>
                                    {/* <ProfileProp propName={"Email"} propValue={profile.emailAddress}/> */}
                                    {/* <ProfileProp propName={"Telefone"} propValue={profile.Telefone}/> */}
                                    {/* <ProfileProp propName={"Endereço"} propValue={profile.location}/> */}
                                    {/* <ProfileProp propName={"CNPJ"} propValue={profile.CNPJ}/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-8 px-10">
                        <Link to={"/requisitions/"+kitchen}>
                            <div className="w-100 button-container button-font">
                                <input type="submit" className="form-btn" value="Quero doar"/>
                            </div>
                        </Link>
                        <div className="py-1"></div>
                        <Link to={"/donation_history/"+kitchen}>
                            <div className="w-100 button-container button-font">
                                <input type="submit" className="form-btn" value="Doações anteriores"/>
                            </div>
                        </Link>
                    </div>
                    <div className="login-form">
                        <div>
                            <div className="title">{"Eventos"}</div>
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