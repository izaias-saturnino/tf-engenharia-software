import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";
import fetchContent from "../gets/Fetch";

const Requisition = (props) => {

    const navigate = useNavigate();

    console.log(props.requisition);

    const handleRequisition = (event) => {
        event.preventDefault();
        navigate("/donation/"+props.requisition.donationIdentification, {state:props.requisition});
    }

    return (
        <form onSubmit={handleRequisition}>
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
                <div className="w-100 button-container pt-3">
                    <input type="submit" className="form-btn" value="Doe agora"/>
                </div>
            </div>
        </form>
    )
}

const Requisitions = (props) => {

    const {kitchen_id} = useParams();

    const state = {...localStorage};

    const [data, setData] = useState({});

    //fetch kitchen?
    var kitchen = state.kitchen;
    //fetchContent(backend_base_url+'/API/', kitchen_id, 'POST', (data)=>setData(data));
    var requisitions = data.requisitions;

    if(requisitions === undefined){
        requisitions = [];
        //requisitions = [{donationIdentification: 1, name: "req name", price: "price", quantity: "quantity", unit: "unit"}];
    }
    if(kitchen === undefined){
        kitchen = {};
        //kitchen = {name: "kitchen name"};
    }

    let results = [];
    let i = 0;

    for (i = 0; i < requisitions.length; i++) {
        results.push(<Requisition className={"default-border-bottom"} requisition={requisitions[i]} kitchenName={kitchen.Name}/>);
    }
    if(results.length === 0){
        results.push(<div className="pt-3">Ainda não há doações disponíveis</div>);
    }
    else{
        results.push(<div className="pt-3">Fim dos resultados</div>);
    }

    return (
        <SearchPage title={"Fazer uma doação"} results={results} placeholder={undefined}/>
    )
};

export default Requisitions;