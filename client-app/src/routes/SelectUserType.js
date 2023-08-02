import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';
import backArrow from '../images/backArrow.png';

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

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
        <div className="app">
            <div className="p-10">
                <div className="login-form">
                    <form onSubmit={backNavigation}>
                        <div className="row w-100 pb-3">
                            <div className="col">
                                <div className="flex-row headerBtn">
                                    <div className="headerBtn flex-row">
                                        <input className="small-img disabled" type="image" src={backArrow}></input>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col">
                            <div className="flex-row right-content">
                                <div className="pb-5 headerBtn flex-row">
                                <input type="submit" value="H"/>
                                </div>
                            </div>
                            </div> */}
                        </div>
                    </form>
                    <div>
                        <div className="title">Criar Conta</div>
                        <div className="justify-text gray-text pb-1">
                            Contribua e faça diferença na vida de pessoas que precisam através da doação de alimentos. Crie sua conta agora mesmo!
                        </div>
                        <div className="pt-5 px-10">
                            <img className="w-100" src={logo}></img>
                        </div>
                        <div className="pt-5"></div>
                        <form onSubmit={toRegistrationKitchen}>
                            <div className="w-100 button-container">
                                <input type="submit" value="Sou uma cozinha solidária"/>
                            </div>
                        </form>
                        <form onSubmit={toRegistrationDonor}>
                            <div className="w-100 button-container">
                                <input type="submit" value="Sou um doador"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SelectUserType;