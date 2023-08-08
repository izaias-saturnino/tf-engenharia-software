import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login";
import SearchPage from "../components/SeachPage"

const Donation = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO add link */}
            <div className="title2 link">
                {props.donation.kitchenName}
            </div>
            <div className="search-item-properties">
                <div className="mb-3"></div>
                <div className="search-item-propertie">
                    CNPJ: {props.donation.CNPJ}
                </div>
                <div className="search-item-propertie">
                    Valor: {props.donation.value}
                </div>
                <div className="search-item-propertie">
                    Ingrediente: {props.donation.ingredient}
                </div>
                <div className="search-item-propertie">
                    Data: {props.donation.date}
                </div>
            </div>
        </div>
    )
}

const DonationHistory = (props) => {
    //fetch donations
    let donations = [];

    let results = [];
    let i = 0;
    if(donations != undefined){
        for (i = 0; i < donations.length; i++) {
            results.push(<Donation className={"default-border-bottom"} donation={donations[i]}/>);
        }
    }

    // let donationTest = {
    //     "kitchenName": "Nome",
    //     "CNPJ": "987654321",
    //     "value": "R$ 3.00",
    //     "ingreddient": "Cenoura",
    //     "date": "24/05/2022 12:12",
    // };
    // results.push(<Donation className={"default-border-bottom"} donation={donationTest}/>);

    if(props.search != undefined){
        if(donations.length == 0){
            results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
        }
        else{
            results.push(<div className="pt-5">Fim dos resultados.</div>);
        }
    }

    //results.push(<div className="pt-5">Fim dos resultados.</div>);

    return (
        <SearchPage title={"Doações"} results={results} placeholder={"Filtrar"}/>
    )
};

export default DonationHistory;