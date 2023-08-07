import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";

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
              <input placeholder="Email" type="email" name="email" required />
          </div>
          <div className="input-container">
              <input placeholder="Senha" type="password" name="pass" required />
          </div>
          <div className="input-container">
              <input placeholder="Digite a senha novamente" type="password" name="pass2" required />
          </div>
          <div className="input-container">
              <input placeholder="Nome" type="text" name="username" required />
          </div>
          {props.state.reg_utype === "doador" ?
            <div className="input-container">
              {/* TODO make date selection tool */}
                <input placeholder="Data de Nascimento" type="text" name="birthDate" required />
            </div>
            :
            <div></div>
          }
          <div className="input-container">
            {/* make js mask for input (after modifying number) */}
              <input placeholder="Telefone" type="text" name="username" />
          </div>
          <div className="input-container">
              <input placeholder="Endereço" type="text" name="address" />
          </div>
          <div className="input-container">
              <input placeholder="Cidade" type="text" name="address" />
          </div>
          <div className="input-container">
              <input placeholder="Estado" type="text" name="address" />
          </div>
          <div className="input-container">
              <input placeholder="CPF/CNPJ" type="text" name="address" required />
          </div>
          <div className="w-100 button-container">
              <input type="submit" value="Criar Conta"/>
          </div>
      </form>
    </div>
  )
}

const Registration = (props) => {

    const state = { ...localStorage };

    const navigate = useNavigate();

    const handleRegistration = (event) => {
        event.preventDefault();
    
        var { username, address, email, pass, pass2 } = document.getElementsByClassName("main-form")[0];
    
        if(pass.value !== pass2.value){
          alert("As duas senhas precisam ser iguais.");
          return;
        }
    
        var user_type = state.utype === "doador" ? "donor" : "kitchen";
    
        let uri = 'https://e30a-143-54-52-136.ngrok-free.app/API/SignUp/'+user_type;
    
        const item = {
          emailAddress: email.value,
          name: username.value,
          password: pass.value,
          location: address.value
        };
    
        var resp_ok = true;
    
        fetch(uri, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item)
        })
          .then((resp) => {
            if(resp.status === 400){
              resp_ok = false;
            }
            return resp.json();
          })
          .then((data) => {
            //console.log(data);
            if(resp_ok){
              alert("Usuário cadastrado com sucesso.");
            }else{
              if(data.errors === undefined){
                alert(data);
              }
              else{
                var str = "";
                for(var element in data.errors){
                  str += data.errors[element] + "\n";
                }
                alert(str);
              }
            }
          })
          .catch(error => {
            //TO DO
          });
    };

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
      <div className="app">
        <div className="p-10">
            <AccountForm title={"Criar Conta"} content={<Content formFunction={handleRegistration} state={state}/>}/>
        </div>
      </div>
    )
};

export default Registration;