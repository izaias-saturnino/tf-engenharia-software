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
                <form className="d-flex right-content w-100 px-2">
                    <input type="submit" className="form-btn" value="Validar"/>
                </form>
                :
                <div></div>
                }
                <form className={"d-flex left-content px-2 "+(isKitchen ? "w-100" : "")}>
                    <input type="submit" className="form-btn" value="Deletar"/>
                </form>
            </div>
            :
            <div></div>
            }
        </div>
    )
}

const updateResults = (setResults, newProfiles) =>{
    var profiles = newProfiles;
    var results = [];
    for (var i = 0; i < profiles.length; i++) {
        results.push(<AccountResult className={"default-border-bottom"} profile={profiles[i]}/>);
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

    const [admin, setAdmin] = useState(state.utype === 0);

    const [results, setResults] = useState([]);

    useEffect(()=>{
        if(admin){
            //fetch profiles as manager
            let uri = backend_base_url+'/API/ManagerField';
            fetchContent(uri, null, 'POST', (data)=>{
                var profiles = data.donors.concat(data.kitchens)
                console.log(profiles);
                updateResults(setResults, profiles);
            });
        }
        else{
            if(query === undefined){
                let uri = backend_base_url+'/API/SearchForKitchens/All';

                fetchContent(uri, 0, 'POST', (data)=>{
                    var profiles = data;
                    console.log("profiles");
                    console.log(profiles);
                    updateResults(setResults, profiles);
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
                    updateResults(setResults, profiles);
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