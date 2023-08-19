import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login.js";
import UpperMenu from "../components/UpperMenu.js";
import SearchPage from "../components/SeachPage.js";

const AccountResult = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO: add navigation to profile */}
            <div className="title2 link">
                {props.profile.name}
            </div>
            {props.profile.utype === "kitchen" ?
                <div className="search-item-properties">
                    <div className="mb-3"></div>
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
    )
}

const AccountSearch = (props) => {

    //fetch profiles
    let profiles = [];

    let results = [];
    let i = 0;
    if(profiles !== undefined){
        for (i = 0; i < profiles.length; i++) {
            results.push(<AccountResult className={"default-border-bottom"} profile={profiles[i]}/>);
        }
        if(profiles.length === 0){
            results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
        }
        else{
            results.push(<div className="pt-5">Fim dos resultados.</div>);
        }
    }

    // let profileTest = {
    //     "name": "name",
    //     "addres": "addres",
    //     "utype": "kitchen",
    //     "CNPJ" : "987654321"
    // };
    // results.push(<AccountResult className={"default-border-bottom"} profile={profileTest}/>);
    // profileTest = {
    //     "name": "name",
    //     "utype": "donor"
    // };
    // results.push(<AccountResult className={"default-border-bottom"} profile={profileTest}/>);

    //results.push(<div className="pt-5">Fim dos resultados.</div>);

    return (
        <SearchPage title={"Resultados"} results={results} placeholder={"Pesquisar"}/>
    )
};

export default AccountSearch;