import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "./Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";

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

    const {kitchen_id} = useParams();

    let donations = [];
    let kitchen = {};

    if(kitchen_id != undefined){
        //fetch kitchen donations
    
        let uri = backend_base_url+'/API/KitchenHistory/'+kitchen_id;
    
        var resp_ok = true;
    
        fetch(uri, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if(resp.status === 400){
                    resp_ok = false;
                }
                return resp.json();
            })
            .then((data) => {
                if(resp_ok){
                    kitchen = data.kitchen;
                    donations = data.donations;
                    console.log("resp_ok");
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
    }else{
        //TO DO
        //fetch donor donations
    }

    //console.log(donations);

    let results = [];
    let i = 0;
    if(donations != undefined){
        for (i = 0; i < donations.length; i++) {
            results.push(<Donation className={"default-border-bottom"} donation={donations[i]} kitchenName={kitchen.Name}/>);
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