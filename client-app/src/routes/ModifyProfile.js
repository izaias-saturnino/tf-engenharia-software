import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import defaultProfilePic from '../images/default-profile-picture.png';

import AccountForm from "../components/AccountForm";

const Content = (props) => {
  return (
    <div className="form">
      <form className="main-form" onSubmit={props.formFunction}>
        <div className="py-3 px-15">
          <img className="w-100 rounded-border" src={defaultProfilePic}></img>
        </div>
        <div className="py-3">
          Informe seus novos dados.
        </div>
        <div className="input-container">
          <input placeholder="Nome" type="text" name="username" />
        </div>
        <div className="input-container">
          <input placeholder="Endereço" type="text" name="address" />
        </div>
        <div className="input-container">
          <input placeholder="Senha atual" type="password" name="pass" />
        </div>
        <div className="input-container">
          <input placeholder="Nova senha" type="password" name="pass" />
        </div>
        <div className="input-container">
          <input placeholder="Digite a nova senha novamente" type="password" name="pass2" />
        </div>
        <div className="w-100 button-container">
          <input type="submit" value="Alterar"/>
        </div>
      </form>
    </div>
  )
}

const ModifyProfile = (props) => {

    const state = { ...localStorage };

    const navigate = useNavigate();

    const handleModifyProfile = (event) => {
        event.preventDefault();

        var { username, address, email, pass, pass2 } = document.getElementsByClassName("main-form")[0];

        var passError = false;
        if(pass.value !== pass2.value){
            alert("As duas senhas precisam ser iguais.");
            return;
        }

        //TO DO (add backend integration)
    };

    //add user verification step?
    
    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
      <div className="app">
          <div className="p-10">
              <AccountForm title={"Modificar Informações"} content={<Content formFunction={handleModifyProfile}/>}/>
          </div>
      </div>
    )
};

export default ModifyProfile;