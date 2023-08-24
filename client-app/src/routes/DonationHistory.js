import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';

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

const updateResults = (donations, kitchen = undefined) => {
    var results = [];
    if(donations !== undefined){
        for (var donation in donations) {
            results.push(<Donation className={"default-border-bottom"} donation={donations[donation]} kitchen={kitchen}/>);
        }
    }
    if(donations === undefined || donations.length === 0){
        results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
    }
    return results;
}

const DonationHistory = (props) => {

    const state = { ...localStorage };

    const {kitchen_id} = useParams();

    const [results, setResults] = useState([]);

    const [kitchen, setKitchen] = useState({});

    useEffect(()=>{
        if(kitchen_id !== undefined){
            fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen_id, 'POST', (data)=>setKitchen(data.kitchen));
        }
    }, [kitchen_id]);

    useEffect(()=>{
        if(kitchen_id !== undefined){
            fetchContent(backend_base_url+'/API/KitchenHistory', kitchen_id, 'POST', (data)=>{
                console.log("KitchenHistory");
                console.log(data);
                setResults(updateResults(data.donations, kitchen));
            });
        }
        else if(state.utype === "cozinha solidária"){
            fetchContent(backend_base_url+'/API/KitchenHistory', state.id, 'POST', (data)=>{
                console.log("KitchenHistory");
                console.log(data);
                setResults(updateResults(data.donations, kitchen));
            });
        }
        else{
            fetchContent(backend_base_url+'/API/DonationHistory', state.id, 'POST', (data)=>{
                console.log("DonationHistory");
                console.log(data);
                setResults(updateResults(data, kitchen));
            });
        }
    }, [kitchen_id, kitchen]);

    //fetch kitchen

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return (
        <SearchPage title={"Doações"} results={results}/>
    )
};

export default DonationHistory;