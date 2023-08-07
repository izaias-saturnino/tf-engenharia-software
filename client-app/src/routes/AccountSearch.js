import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";

const AccountResult = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO: add navigation to profile */}
            <div className="title2 link">
                {props.profile.name}
            </div>
            {props.profile.utype == "kitchen" ?
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
    if(profiles != undefined){
        for (i = 0; i < profiles.length; i++) {
            results.push(<AccountResult className={"default-border-bottom"} profile={profiles[i]}/>);
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

    if(props.search != undefined){
        if(profiles.length == 0){
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
                <div className="login-form justify-text">
                    <div>
                        <div className="title">Resultados</div>
                        <div>
                            <form className="main-form">
                                <div className="input-container">
                                    <input placeholder="Pesquisar" type="text" name="search" />
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

export default AccountSearch;