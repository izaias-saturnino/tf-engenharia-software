import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';
import backArrow from '../images/backArrow.png';

import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Login.js";

const Home = (props) => {

    const isAuthenticated = !!localStorage.getItem("token");

    const location = useLocation();
    const [state, setState] = useState(location.state);
    //const [state, setState] = useState({username: "user", utype: "cozinha solidária", validatedKitchen: true});

    const navigate = useNavigate();

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    if(state === null){
        return <Login/>;
    }

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
                        <div className="title">Home</div>
                        <div>Usuário {state.username} logado com sucesso.</div>
                        <div>Usuário logado como {state.utype}.</div>
                        {!state.validatedKitchen && state.utype === "cozinha solidária" ? (
                            <div>Seu cadastro ainda não foi validado.</div>
                        ) : (
                            <div></div>
                        )}
                        {state.validatedKitchen && state.utype === "cozinha solidária" ? (
                            <div>Seu cadastro está validado.</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;