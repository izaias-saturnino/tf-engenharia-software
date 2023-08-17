import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";
import fetchContent from "../gets/Fetch";

const Donation = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO add link */}
            {props.kitchen !== undefined && (
                <div className="title2 link">
                    <Link to={"/profile_kitchen/"+props.kitchen.identification}>
                        {props.kitchen.name}
                    </Link>
                </div>
            )}
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

    const state = { ...localStorage };

    localStorage.removeItem('donations');

    const {kitchen_id} = useParams();

    var data;
    if(kitchen_id === undefined){
        data = fetchContent(backend_base_url+'/API/KitchenHistory', kitchen_id, 'POST');
    }
    else{
        data = fetchContent(backend_base_url+'/API/DonationHistory', state.id, 'POST');
    }

    var donations = data.donations;
    //preciso que tu me passe os dados da cozinha no donation history do donor
    var kitchen = fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen_id, 'POST').kitchen;

    let results = [];
    let i = 0;

    if(donations !== undefined){
        for (i = 0; i < donations.length; i++) {
            if(kitchen_id === undefined){
                kitchen = fetchContent(backend_base_url+'/API/AccessKitchenProfile', donations[i].kitchenIdentification, 'POST').kitchen;
            }
            results.push(<Donation className={"default-border-bottom"} donation={donations[i]} kitchen={kitchen}/>);
        }
    }

    if(donations === undefined || donations.length === 0){
        results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
    }

    return (
        <SearchPage title={"Doações"} results={results} placeholder={"Filtrar"}/>
    )
};

export default DonationHistory;