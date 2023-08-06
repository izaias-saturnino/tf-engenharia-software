import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";
import AccountForm from "../components/AccountForm";

const KitchenSearch = (props) => {
    return (
        <div className="app">
            <div className="p-10">
                <div className="login-form">
                    <div>
                        <div className="title">Pesquisar Cozinhas</div>
                        <div>
                            <form className="main-form">
                                <div className="pt-5 px-10">
                                    <img className="w-100"></img>
                                </div>
                                <div className="input-container">
                                    <input placeholder="Email" type="email" name="email" required />
                                </div>
                                <div className="input-container">
                                    <input placeholder="Senha" type="password" name="pass" required />
                                </div>
                                <div className="w-100 button-container">
                                    <input type="submit" value="Entrar"/>
                                </div>
                            </form>
                            <Link to="/select_user_type">
                                <div className="w-100 button-container">
                                    <input type="submit" value="Criar Conta"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default KitchenSearch;