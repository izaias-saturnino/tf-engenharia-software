import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";
import UpperMenu from "../components/UpperMenu";
import fetchContent from "../gets/Fetch";

const getDonationHistory = async (kitchen_id) => {

    const state = {...localStorage};

    var response;
    if(kitchen_id !== undefined){
        //fetch kitchen donations
    
        let uri = backend_base_url+'/API/KitchenHistory';
    
        var resp_ok = true;
    
        response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: kitchen_id
        })
            .then((resp) => {
                if(resp.status === 400){
                    resp_ok = false;
                }
                return resp.json();
            })
            .then((data) => {
                if(resp_ok){
                    localStorage.setItem('donations', data.donations);
                    localStorage.setItem('kitchen', data.kitchen);
                    console.log("resp_ok");
                    //navigate("/donation_history/" + kitchen_id);
                }else{
                    if(data.errors === undefined){
                        alert(data);
                    }
                    else{
                        var str = "";
                        for(var element in data.errors){
                        str += data.errors[element] + "\n";
                        }
                        alert(str);
                    }
                }
            })
            .catch(error => {
                //TO DO
            });
    }
    else{
        let uri = backend_base_url+'/API/DonationHistory';
    
        var resp_ok = true;
    
        response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: state.id
        })
            .then((resp) => {
                if(resp.status === 400){
                    resp_ok = false;
                }
                return resp.json();
            })
            .then((data) => {
                if(resp_ok){
                    localStorage.setItem('donations', data.donations);
                    console.log("resp_ok");
                    //navigate("/donation_history");
                }else{
                    if(data.errors === undefined){
                        alert(data);
                    }
                    else{
                        var str = "";
                        for(var element in data.errors){
                        str += data.errors[element] + "\n";
                        }
                        alert(str);
                    }
                }
            })
            .catch(error => {
                //TO DO
            });
    }
    var data;
    if(response == undefined){
        data = {};
    }
    else{
        data = await response.json();
    }
    return data;
}

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

    var data = getDonationHistory(kitchen_id).donations;
    var donations = data.donations;
    //preciso que tu me passe os dados da cozinha no donation history do donor
    var kitchen = fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen_id, 'POST').kitchen;
    var undefinedKitchen = kitchen === undefined;

    let results = [];
    let i = 0;

    if(donations !== undefined){
        for (i = 0; i < donations.length; i++) {
            if(undefinedKitchen){
                kitchen = fetchContent(backend_base_url+'/API/AccessKitchenProfile', donations[i].kitchenIdentification, 'POST').kitchen;
            }
            results.push(<Donation className={"default-border-bottom"} donation={donations[i]} kitchen={kitchen}/>);
        }
    }

    if(donations === undefined || donations.length === 0){
        results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
    }

    return (
        <div>
            <UpperMenu/>
            <SearchPage title={"Doações"} results={results} placeholder={"Filtrar"}/>
        </div>
    )
};

export default DonationHistory;