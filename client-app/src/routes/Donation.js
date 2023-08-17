import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";
import UpperMenu from "../components/UpperMenu";

const Content = (props) => {
  return (
    <div>
      <form className="main-form" onSubmit={props.formFunction}>
        <div className="justify-text gray-text pb-1">
            Contribua e faça diferença na vida de pessoas que precisam através da doação de alimentos.
        </div>
        <div className="pt-5 px-10">
            <img className="w-100" src={logo}></img>
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
            <input type="submit" className="form-btn" value="Doar"/>
        </div>
      </form>
    </div>
  )
}

const Donation = (props) => {

    var requisition = useLocation().state;

    if(requisition === undefined || requisition === null){
        requisition = {};
    }

    const state = { ...localStorage };

    console.log("donation page");
    console.log(requisition);

    const handleDonation = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <UpperMenu/>
            <div className="app">
                <div className="p-10">
                    <AccountForm title={"Fazer uma doação"} content={<Content formFunction={handleDonation} requisition={requisition}/>} backNavigation={"skip"}/>
                </div>
            </div>
        </div>
    )
};

export default Donation;