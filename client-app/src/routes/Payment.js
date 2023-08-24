import React, { useEffect, useState } from "react";

import AccountForm from "../components/AccountForm";
import UpperMenu from "../components/UpperMenu";
import { Link, Navigate, useParams } from "react-router-dom";
import fetchContent from "../gets/Fetch";
import { backend_base_url } from "../App";

const Content = (props) => {
  return (
    <div>
      <form className="main-form" onSubmit={props.formFunction}>
        <div className="search-item-properties">
            <div className="mb-3"></div>
            {/* <div className="search-item-propertie">
                CNPJ: {props.requisition.CNPJ}
            </div> */}
            <Link to={"/profile_kitchen/"+props.kitchen.identification} className="search-item-propertie link">
                {props.kitchen.name}
            </Link>
            <div className="search-item-propertie">
                {props.kitchen.email}
            </div>
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
            <input type="submit" className="form-btn" value="Confirmar pagamento"/>
        </div>
      </form>
    </div>
  )
}

const Payment = (props) => {

    const {requisition_id} = useParams();

    const state = { ...localStorage };

    //fetch requisition
    const [requisition, setRequisition] = useState({});

    useEffect(()=>{
        fetchContent(backend_base_url+'/API/Donate/DisplayDonationRequest', requisition_id, 'POST',
        (data)=>{
            setRequisition(data);
        });
    }, requisition_id);

    //fetch kitchen
    var [kitchen, setKitchen] = useState({});
    /*fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen, 'POST',
    (data)=>{
        setKitchen(data.kitchen);
    });*/

    const handlePayment = (event) => {
        event.preventDefault();
        //fetch send payment
        const item = {
            donationIdentification: requisition_id,
            donorIdentification: state.id
        }
        let uri = backend_base_url+'/API/Donate';
        fetchContent(uri, JSON.stringify(item), 'PATCH', (data)=>alert(data));
    };

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return (
        <div>
            <UpperMenu/>
            <div className="app">
                <div className="p-10">
                    <AccountForm title={"Dados da doação"} content={<Content formFunction={handlePayment} requisition={requisition} kitchen={kitchen}/>} backNavigation={"skip"}/>
                </div>
            </div>
        </div>
    )
};

export default Payment;