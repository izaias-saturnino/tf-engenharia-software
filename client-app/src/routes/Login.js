import React from "react";
import { useNavigate, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';

import AccountForm from "../components/AccountForm";
import { backend_base_url } from "../App";
import fetchContent from "../gets/Fetch";

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
            <input type="submit" className="form-btn" value="Entrar"/>
        </div>
      </form>
      <Link to="/select_user_type">
          <div className="w-100 button-container">
              <input type="submit" className="form-btn" value="Criar Conta"/>
          </div>
      </Link>
    </div>
  )
}

const Login = (props) => {

    window.localStorage.clear();
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
    
        let uri = backend_base_url+'/API/SignIn';
    
        const item = {
          emailAddress: email.value,
          password: pass.value
        };

        fetchContent(uri, JSON.stringify(item), 'POST', (data)=>{
            localStorage.setItem("email", JSON.stringify(email.value));
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            var str = getUtype(data.actor_type);
            localStorage.setItem("utype", str);
            localStorage.setItem("id", JSON.stringify(data.actor.identification));
            //localStorage.setItem("username", JSON.stringify(data.username));
            if(str === "cozinha solidária"){
                localStorage.setItem("validatedKitchen", JSON.stringify(data.actor.validated));
            }
            navigate('/home');
        });
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