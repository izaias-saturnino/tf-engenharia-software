import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";
import { backend_base_url } from "../App";
import fetchContent from "../gets/Fetch";

const Content = (props) => {
  return (
    <div>
      <form className="main-form" onSubmit={props.formFunction}>
          <div className="justify-text gray-text pb-1">
            Contribua e faça diferença na vida de pessoas que precisam através da doação de alimentos. Crie sua conta agora mesmo!
          </div>
          <div className="pt-5 px-10">
              <img className="w-100" src={logo}></img>
          </div>
          <div className="input-container">
              <input placeholder="Nome" type="text" name="username" required />
          </div>
          <div className="input-container">
              <input placeholder="Email" type="email" name="email" required />
          </div>
          <div className="input-container">
              <input placeholder="Senha" type="password" name="pass" required />
          </div>
          <div className="input-container">
              <input placeholder="Digite a senha novamente" type="password" name="pass2" required />
          </div>
          {props.utype === "batata" ? // donor
            <div className="input-container">
              {/* TODO make date selection tool */}
                <input placeholder="Data de Nascimento" type="text" name="birthDate" required />
            </div>
            :
            <div></div>
          }
          {/* <div className="input-container"> */}
            {/* make js mask for input (after modifying number) */}
              {/* <input placeholder="Telefone" type="text" name="username" /> */}
          {/* </div> */}
          {/* <div className="input-container">
              <input placeholder="Endereço" type="text" name="address" />
          </div>
          <div className="input-container">
              <input placeholder="Cidade" type="text" name="address" />
          </div>
          <div className="input-container">
              <input placeholder="Estado" type="text" name="address" />
          </div>
          <div className="input-container">
              <input placeholder={props.utype === "donor" ? "CPF" : "CNPJ"} type="text" name="address" required />
          </div> */}
          <div className="w-100 button-container">
              <input type="submit" className="form-btn" value="Criar Conta"/>
          </div>
      </form>
    </div>
  )
}

const Registration = (props) => {

    let state = { ...localStorage };
    const {user_type} = useParams();

    const navigate = useNavigate();

    const handleRegistration = (event) => {
        event.preventDefault();
    
        var { username, address, email, pass, pass2 } = document.getElementsByClassName("main-form")[0];
    
        if(pass.value !== pass2.value){
          alert("As duas senhas precisam ser iguais.");
          return;
        }
    
        var url_user_type = user_type === "donor" ? "donor" : "kitchen";
    
        let uri = backend_base_url+'/API/SignUp/'+url_user_type;
    
        const item = {
          emailAddress: email.value,
          name: username.value,
          password: pass.value,
          location: address.value
        };
    
        fetchContent(uri, JSON.stringify(item), 'POST', (data)=>alert(data));
    };

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
      <div className="app">
        <div className="p-10">
            <AccountForm title={"Criar Conta"} content={<Content formFunction={handleRegistration} state={state} utype={user_type}/>}/>
        </div>
      </div>
    )
};

export default Registration;