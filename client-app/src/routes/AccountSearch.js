import React, { useEffect, useState } from "react";

import SearchPage from "../components/SeachPage.js";
import { Link, Navigate, useParams } from "react-router-dom";
import fetchContent from "../gets/Fetch.js";
import { backend_base_url } from "../App.js";

export const AccountResult = (props) => {
    var isKitchen = props.profile.utype === "kitchen";

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
                    {props.profile.email}
                </div>
                {isKitchen ?
                <div>
                    <div className="search-item-propertie">
                        {props.profile.addres}
                    </div>
                    <div className="search-item-propertie">
                        CNPJ: {props.profile.CNPJ}
                    </div>
                </div>
                :
                <div></div>
                }
            </div>
            {props.admin?
            <div className="pt-3 flex center-content">
                {isKitchen ?
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

const updateResults = (setResults, newProfiles, query = undefined) =>{
    var profiles = newProfiles;
    var results = [];
    if(query !== undefined){
        for (var i = 0; i < profiles.length; i++) {
            results.push(<AccountResult key={"result"+i} className={"default-border-bottom"} profile={profiles[i]}/>);
        }
        if(profiles.length === 0){
            results.push(<div key={"final result"} className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
        }
        else{
            results.push(<div key={"final result"} className="pt-5">Fim dos resultados.</div>);
        }
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
                updateResults(setResults, profiles, query);
            });
        }
        else{
            let uri = backend_base_url+'/API/SearchForKitchens/All';
            fetchContent(uri, null, 'POST', (data)=>{
                var profiles = data.donors.concat(data.kitchens)
                console.log(profiles);
                updateResults(setResults, profiles, query);
            });
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