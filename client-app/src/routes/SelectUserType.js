import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";

const Content = (props) => {
    return (
      <div>
        <div className="justify-text gray-text pb-1">
            Contribua e faça diferença na vida de pessoas que precisam através da doação de alimentos. Crie sua conta agora mesmo!
        </div>
        <div className="pt-5 px-10">
            <img className="w-100" src={logo}></img>
        </div>
        <div className="pt-5"></div>
        <form onSubmit={props.formFunction1}>
            <div className="w-100 button-container">
                <input type="submit" value="Sou uma cozinha solidária"/>
            </div>
        </form>
        <form onSubmit={props.formFunction2}>
            <div className="w-100 button-container">
                <input type="submit" value="Sou um doador"/>
            </div>
        </form>
      </div>
    )
}

const SelectUserType = (props) => {

    const location = useLocation();
    const [state, setState] = useState(location.state);

    const navigate = useNavigate();

    const toRegistrationDonor = (event) => {
        event.preventDefault();
        var new_state = {};
        new_state.utype = "doador";
        setState(new_state);
        navigate("/registration", {state:state});
    };

    const toRegistrationKitchen = (event) => {
        event.preventDefault();
        var new_state = {};
        new_state.utype = "cozinha solidária";
        setState(new_state);
        navigate("/registration", {state:state});
    };

    return (
        <div className="app">
            <div className="p-10">
                <AccountForm title={"Criar Conta"} content={<Content formFunction1={toRegistrationKitchen} formFunction2={toRegistrationDonor}/>}/>
            </div>
        </div>
    )
};

export default SelectUserType;