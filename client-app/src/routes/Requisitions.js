import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";

const Requisition = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO add link */}
            <div className="title2 link">
                {props.kitchenName}
            </div>
            <div className="search-item-properties">
                <div className="mb-3"></div>
                {/* <div className="search-item-propertie">
                    CNPJ: {props.requisition.CNPJ}
                </div> */}
                <div className="search-item-propertie">
                    Ingrediente: {props.requisition.name}
                </div>
                <div className="search-item-propertie">
                    Preço: {props.requisition.price}
                </div>
                <div className="search-item-propertie">
                    Quantidade: {props.requisition.quantity}
                </div>
                <div className="search-item-propertie">
                    Unidade: {props.requisition.unit}
                </div>
                {/* <div className="search-item-propertie">
                    Data: {props.requisition.date}
                </div> */}
            </div>
        </div>
    )
}

const Requisitions = (props) => {

    const navigate = useNavigate();

    const state = { ...localStorage };

    var requisitions = state.requisitions;

    localStorage.setItem('requisitions', '');

    var requisitions = state.requisitions;
    var kitchen = state.kitchen;

    const {kitchen_id} = useParams();

    if(requisitions == '' || requisitions == undefined){
        if(kitchen_id == undefined){
            navigate('/get_donation_history');
        }
        else{
            navigate('/get_donation_history/'+kitchen_id);
        }
    }

    let results = [];
    let i = 0;

    if(requisitions != '' && requisitions != undefined){
        for (i = 0; i < requisitions.length; i++) {
            results.push(<Requisition className={"default-border-bottom"} requisition={requisitions[i]} kitchenName={kitchen.Name}/>);
        }
    }

    return (
        <SearchPage title={"Fazer uma doação"} results={results} placeholder={"Filtrar"}/>
    )
};

export default Requisitions;