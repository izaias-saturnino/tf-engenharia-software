import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";

const Content = (props) => {
  return (
    <div>
      <form className="main-form" onSubmit={props.formFunction}>
        <div className="justify-text gray-text pb-1">
            Contribua e faça diferença na vida de pessoas que precisam através da doação de alimentos. Acesse sua conta para começar a ajudar!
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
  )
}

const Login = (props) => {

    // state.isLoggedIn = undefined;
    // state.email = undefined;
    // state.username = undefined;
    // state.utype = undefined;
    // state.validatedKitchen = undefined;
    const state = { ...localStorage };

    const navigate = useNavigate();

    function getUtype(int){
        if(int === 1){
            return "doador";
        }
        if(int === 2){
            return "cozinha solidária";
        }
        if(int === 0){
            return "administrador";
        }
    }

    const handleLogin = (event) => {
        event.preventDefault();
    
        var { email, pass } = document.getElementsByClassName("main-form")[0];
    
        let uri = 'https://e30a-143-54-52-136.ngrok-free.app/API/SignIn';
    
        const item = {
          emailAddress: email.value,
          password: pass.value
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
              localStorage.setItem("email", JSON.stringify(email.value));
              localStorage.setItem("isLoggedIn", JSON.stringify(true));
              var str = getUtype(data.actor_type);
              localStorage.setItem("utype", JSON.stringify(true));
              //localStorage.setItem("username", JSON.stringify(data.username));
              if(str === "cozinha solidária"){
                localStorage.setItem("validatedKitchen", JSON.stringify(data.actor.validated));
              }
              navigate('/home');
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
                <AccountForm title={"Login"} content={<Content formFunction={handleLogin}/>}/>
            </div>
        </div>
    )
};

export default Login;