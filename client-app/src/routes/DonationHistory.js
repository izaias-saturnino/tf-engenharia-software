import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";
import UpperMenu from "../components/UpperMenu";

const Donation = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO add link */}
            <div className="title2 link">
                {props.kitchenName}
            </div>
            <div className="search-item-properties">
                <div className="mb-3"></div>
                {/* <div className="search-item-propertie">
                    CNPJ: {props.donation.CNPJ}
                </div> */}
                <div className="search-item-propertie">
                    Ingrediente: {props.donation.name}
                </div>
                <div className="search-item-propertie">
                    Preço: {props.donation.price}
                </div>
                <div className="search-item-propertie">
                    Quantidade: {props.donation.quantity}
                </div>
                <div className="search-item-propertie">
                    Unidade: {props.donation.unit}
                </div>
                {/* <div className="search-item-propertie">
                    Data: {props.donation.date}
                </div> */}
            </div>
        </div>
    )
}

const DonationHistory = (props) => {

    const navigate = useNavigate();

    const state = { ...localStorage };

    var donations = state.donations;
    var kitchen = state.kitchen;

    localStorage.removeItem('donations');

    const {kitchen_id} = useParams();

    if(donations === undefined){
        if(kitchen_id === undefined){
            navigate('/get_donation_history');
        }
        else{
            navigate('/get_donation_history/'+kitchen_id);
        }
    }

    let results = [];
    let i = 0;

    if(donations !== '' && donations !== undefined){
        for (i = 0; i < donations.length; i++) {
            results.push(<Donation className={"default-border-bottom"} donation={donations[i]} kitchenName={kitchen.Name}/>);
        }
    }

    // if(props.search != undefined){
    //     if(donations.length == 0){
    //         results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
    //     }
    //     else{
    //         results.push(<div className="pt-5">Fim dos resultados.</div>);
    //     }
    // }

    //results.push(<div className="pt-5">Fim dos resultados.</div>);

    return (
        <div>
            <UpperMenu/>
            <SearchPage title={"Doações"} results={results} placeholder={"Filtrar"}/>
        </div>
    )
};

export default DonationHistory;