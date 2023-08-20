import React from "react";
import { useNavigate } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";
import UpperMenu from "../components/UpperMenu";

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
                <input type="submit" className="form-btn" value="Sou uma cozinha solidária"/>
            </div>
        </form>
        <form onSubmit={props.formFunction2}>
            <div className="w-100 button-container">
                <input type="submit" className="form-btn" value="Sou um doador"/>
            </div>
        </form>
      </div>
    )
}

const SelectUserType = (props) => {

    const navigate = useNavigate();

    const toRegistrationDonor = (event) => {
        event.preventDefault();
        navigate("/registration/donor");
    };

    const toRegistrationKitchen = (event) => {
        event.preventDefault();
        navigate("/registration/kitchen");
    };

    return (
        <div>
            <div className="app">
                <div className="p-10">
                    <AccountForm title={"Criar Conta"} content={<Content formFunction1={toRegistrationKitchen} formFunction2={toRegistrationDonor}/>}/>
                </div>
            </div>
        </div>
    )
};

export default SelectUserType;