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

    const [data, setData] = useState({});
    if(kitchen_id === undefined){
        fetchContent(backend_base_url+'/API/KitchenHistory', kitchen_id, 'POST', (data)=>{setData(data)});
    }
    else{
        fetchContent(backend_base_url+'/API/DonationHistory', state.id, 'POST', (data)=>{setData(data)});
    }

    var donations = data.donations;
    //preciso que tu me passe os dados da cozinha no donation history do donor
    const [kitchen, setKitchen] = useState({});
    fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen_id, 'POST', (data)=>setKitchen(data.kitchen));

    let results = [];
    let i = 0;

    const [kitchenList, setKitchenList] = useState([]);

    if(donations !== undefined){
        for (i = 0; i < donations.length; i++) {
            if(kitchen_id === undefined){
                fetchContent(backend_base_url+'/API/AccessKitchenProfile', donations[i].kitchenIdentification, 'POST', (data)=>setKitchenList(kitchenList.concat([data.kitchen])));
                results.push(<Donation className={"default-border-bottom"} donation={donations[i]} kitchen={kitchenList[i]}/>);
            }
            else{
                results.push(<Donation className={"default-border-bottom"} donation={donations[i]} kitchen={kitchen}/>);
            }
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