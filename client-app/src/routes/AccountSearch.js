import React, { useEffect, useState } from "react";

import SearchPage from "../components/SeachPage.js";
import { Link, Navigate, useParams } from "react-router-dom";
import fetchContent from "../gets/Fetch.js";
import { backend_base_url } from "../App.js";

export const AccountResult = (props) => {
    var isKitchen = props.profile.validated !== undefined;

    var isValidated = props.profile.validated === true;

    if(!isKitchen && !props.admin){
        return (<div></div>);
    }

    return (
        <div className={"search-item " + props.className}>
            {isKitchen ?
                <Link className="title2 link" to={"/profile_kitchen/"+props.profile.identification}>
                    {props.profile.name}
                </Link>
                :
                <div className="title2">
                    {props.profile.name}
                </div>
            }
            <div className="search-item-properties">
                <div className="mb-3"></div>
                <div className="search-item-propertie">
                    {props.profile.emailAddress}
                </div>
                {isKitchen ?
                <div>
                    <div className="search-item-propertie">
                        {props.profile.location}
                    </div>
                </div>
                :
                <div></div>
                }
            </div>
            {props.admin?
            <div className="pt-3 flex center-content">
                {isKitchen && !isValidated ?
                <Link to={"/confirm_action/"+"kitchen"+"/validate/"+props.profile.identification} className="d-flex center-content w-100 px-2">
                    <input type="submit" className="form-btn" value="Validar"/>
                </Link>
                :
                <div></div>
                }
                <Link to={"/confirm_action/"+(isKitchen? "kitchen" : "donor")+"/delete/"+props.profile.identification} className={"d-flex center-content px-2 "+(isKitchen ? "w-100" : "")}>
                    <input type="submit" className="form-btn" value="Deletar"/>
                </Link>
            </div>
            :
            <div></div>
            }
        </div>
    )
}

const updateResults = (setResults, newProfiles, admin) =>{
    var profiles = newProfiles;
    var results = [];
    for (var i = 0; i < profiles.length; i++) {
        results.push(<AccountResult className={"default-border-bottom"} profile={profiles[i]} admin={admin}/>);
    }
    if(profiles.length === 0){
        results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
    }
    else{
        results.push(<div className="pt-5">Fim dos resultados.</div>);
    }
    setResults(results);
}

const AccountSearch = (props) => {

    const state = { ...localStorage };

    const {query} = useParams();

    const [admin, setAdmin] = useState(state.utype === "administrador");

    const [results, setResults] = useState([]);

    useEffect(()=>{
        if(admin){
            //fetch profiles as manager
            if(query === undefined){
                let uri = backend_base_url+'/API/ManagerField/GetAllRegistrations';

                fetchContent(uri, 0, 'POST', (data)=>{
                    var profiles = data.donors.concat(data.kitchens);
                    console.log("profiles");
                    console.log(profiles);
                    updateResults(setResults, profiles, admin);
                });
            }
            else{
                let uri = backend_base_url+'/API/ManagerField/GetRegistrationsByFilter';

                fetchContent(uri, JSON.stringify(query), 'POST', (data)=>{
                    var profiles = data.donors.concat(data.kitchens);
                    console.log("profiles");
                    console.log(profiles);
                    updateResults(setResults, profiles, admin);
                });
            }
        }
        else{
            if(query === undefined){
                let uri = backend_base_url+'/API/SearchForKitchens/All';

                fetchContent(uri, 0, 'POST', (data)=>{
                    var profiles = data;
                    console.log("profiles");
                    console.log(profiles);
                    updateResults(setResults, profiles, admin);
                });
            }
            else{
                let uri = backend_base_url+'/API/SearchForKitchens/ByFilter';

                const item = {
                    key: "Name",
                    value: query
                };

                fetchContent(uri, JSON.stringify(item), 'POST', (data)=>{
                    var profiles = data;
                    console.log("profiles");
                    console.log(profiles);
                    updateResults(setResults, profiles, admin);
                });
            }
        }
    }, query);

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return (
        <SearchPage title={"Resultados"} results={results} placeholder={"Pesquisar"}/>
    )
};

export default AccountSearch;