import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";

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
        <div className="input-container">
            <input placeholder="Ingrediente" type="text" name="ingredient" required />
        </div>
        <div className="input-container">
            <input placeholder="Valor da doação" type="text" name="value" required />
        </div>
        <div className="w-100 button-container">
            <input type="submit" value="Doar"/>
        </div>
      </form>
    </div>
  )
}

const Donation = (props) => {

    // state.isLoggedIn = undefined;
    // state.email = undefined;
    // state.username = undefined;
    // state.utype = undefined;
    // state.validatedKitchen = undefined;
    const state = { ...localStorage };

    const navigate = useNavigate();

    const handleDonation = (event) => {
        event.preventDefault();
    };

    return (
        <div className="app">
            <div className="p-10">
                <AccountForm title={"Fazer uma doação"} content={<Content formFunction={handleDonation}/>} backNavigation={"skip"}/>
            </div>
        </div>
    )
};

export default Donation;