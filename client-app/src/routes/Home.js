import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";
import AccountForm from "../components/AccountForm";

const Content = (props) => {
    return (
      <div>
        <div>Usuário {props.state.username} logado com sucesso.</div>
        <div>Usuário logado como {props.state.utype}.</div>
        {!props.state.validatedKitchen && props.state.utype === "cozinha solidária" ? (
            <div>Seu cadastro ainda não foi validado.</div>
        ) : (
            <div></div>
        )}
        {props.state.validatedKitchen && props.state.utype === "cozinha solidária" ? (
            <div>Seu cadastro está validado.</div>
        ) : (
            <div></div>
        )}
      </div>
    )
}

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
                <AccountForm title={"Home"} content={<Content state={state}/>}/>
            </div>
        </div>
    )
};

export default Home;