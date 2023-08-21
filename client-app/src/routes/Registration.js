import React from "react";
import { useParams } from 'react-router-dom';

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
          {props.utype === "donor" ? 
          <div>
            <div className="input-container">
                <input placeholder="Telefone" type="text" name="phone" />
            </div>
            <div className="input-container">
                <input placeholder="CPF" type="text" name="cpf" />
            </div>
          </div>
          :
          <div></div>
          }
          <div className="input-container">
              <input placeholder="Senha" type="password" name="pass" required />
          </div>
          <div className="input-container">
              <input placeholder="Digite a senha novamente" type="password" name="pass2" required />
          </div>
          <div className="w-100 button-container">
              <input type="submit" className="form-btn" value="Criar Conta"/>
          </div>
      </form>
    </div>
  )
}

const Registration = (props) => {

    const state = { ...localStorage };
    const {user_type} = useParams();

    const handleRegistration = (event) => {
        event.preventDefault();
    
        var { username, email, pass, pass2, phone, cpf } = document.getElementsByClassName("main-form")[0];
    
        if(pass.value !== pass2.value){
          alert("As duas senhas precisam ser iguais.");
          return;
        }
    
        var url_user_type = user_type === "donor" ? "donor" : "kitchen";
    
        let uri = backend_base_url+'/API/SignUp/'+url_user_type;
    
        var item;
        
        if(user_type === "donor"){
          item = {
            emailAddress: email.value,
            name: username.value,
            password: pass.value,
            phoneNumber: phone.value,
            itr: cpf.value,
          };
        }
        else{
          item = {
            emailAddress: email.value,
            name: username.value,
            password: pass.value
          };
        }
    
        fetchContent(uri, JSON.stringify(item), 'POST');
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