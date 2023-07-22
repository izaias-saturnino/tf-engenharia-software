import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import logo from './images/doaresLogo.png';
import backArrow from './images/backArrow.png';
import defaultProfilePic from './images/default-profile-picture.png';

function App() {

  // React States
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [page, setPage] = useState("modify profile donor");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [utype, setUtype] = useState("");
  const [navigation, setNavigation] = useState(["modify profile donor"]);
  const [validatedKitchen, setValidatedKitchen] = useState(false);

  function handleReqError(error){
    alert("Serviço indisponível.");
  }

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

  function concatArrays(arr1, arr2){
    return arr1.concat(arr2);
  }

  function goNavigation(page){
    setPage(page);
    setNavigation(concatArrays(navigation, [page]));
  }

  const goBackNavigation = (event) => {
    event.preventDefault();
    var navigation_copy = navigation;
    var last_page = navigation_copy.pop();
    setNavigation(navigation_copy);
    setPage(last_page);
  }

  const clearNavigation = (event) => {
    event.preventDefault();
    //if(isLoggedIn){
    //  setNavigation(["home"]);
    //  setPage("home");
    //}
    //else{
      setNavigation(["login"]);
      setPage("login");
    //}
  }

  function logout(){
    //send logout request

    setisLoggedIn(false);
    setEmail("");
    setUtype("");
    //clearNavigation();
  }

  const loginCreateAccountButtonAction = (event) => {
    event.preventDefault();
    goNavigation("selectUserType");
  };

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
          setEmail(email.value);
          setisLoggedIn(true);
          var str = getUtype(data.actor_type);
          setUtype(str);
          //setUsername(data.username);
          if(str === "cozinha solidária"){
            setValidatedKitchen(data.actor.validated);
          }
          goNavigation("home");
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
        handleReqError(error);
      });
  };

  const login = (
    <div className="form">
      <div className="title">Login</div>
      <form className="main-form" onSubmit={handleLogin}>
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
      <form onSubmit={loginCreateAccountButtonAction}>
        <div className="w-100 button-container">
          <input type="submit" value="Criar Conta"/>
        </div>
      </form>
    </div>
  );

  const toRegistrationKitchen = (event) => {
    event.preventDefault();

    setUtype("cozinha solidária");

    goNavigation("registration");
  };

  const toRegistrationDonor = (event) => {
    event.preventDefault();

    setUtype("doador");

    goNavigation("registration");
  };

  const selectUserType = (
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
  );

  const handleRegistration = (event) => {
    event.preventDefault();

    var { username, address, email, pass, pass2 } = document.getElementsByClassName("main-form")[0];

    if(pass.value !== pass2.value){
      alert("As duas senhas precisam ser iguais.");
      return;
    }

    var user_type = utype === "doador" ? "donor" : "kitchen";

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
        handleReqError(error);
      });
  };

  const registration = (
    <div className="form">
      <div className="title">Criar Conta</div>
      <form className="main-form" onSubmit={handleRegistration}>
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
          <input placeholder="Endereço" type="text" name="address" required />
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
        <div className="w-100 button-container">
          <input type="submit" value="Criar Conta"/>
        </div>
      </form>
    </div>
  );

  const home = (
    <div>
      <div className="title">Home</div>
      <div>Usuário {username} logado com sucesso.</div>
      <div>Usuário logado como {utype}.</div>
      {!validatedKitchen && utype === "cozinha solidária" ? (
        <div>Seu cadastro ainda não foi validado.</div>
      ) : (
        <div></div>
      )}
      {validatedKitchen && utype === "cozinha solidária" ? (
        <div>Seu cadastro está validado.</div>
      ) : (
        <div></div>
      )}
    </div>
  );

  const handleModifyDonor = (event) => {
    event.preventDefault();

    var { username, address, email, pass, pass2 } = document.getElementsByClassName("main-form")[0];

    var passError = false;
    if(pass.value !== pass2.value){
      alert("As duas senhas precisam ser iguais.");
      return;
    }

    //TO DO
  };

  const modify_profile_donor = (
    <div className="form">
      <div className="title">Modificar Informações</div>
      <form className="main-form" onSubmit={handleModifyDonor}>
        <div className="py-3 px-15">
          {/* colocar outra imagem */}
          <img className="w-100 rounded-border" src={defaultProfilePic}></img>
        </div>
        <div className="justify-text py-3">
          Informe seus novos dados.
        </div>
        <div className="input-container">
          <input placeholder="Nome" type="text" name="username" />
        </div>
        <div className="input-container">
          <input placeholder="Endereço" type="text" name="address" />
        </div>
        <div className="input-container">
          <input placeholder="Email" type="email" name="email" />
        </div>
        <div className="input-container">
          <input placeholder="Senha" type="password" name="pass" />
        </div>
        <div className="input-container">
          <input placeholder="Digite a senha novamente" type="password" name="pass2" />
        </div>
        <div className="w-100 button-container">
          <input type="submit" value="Alterar"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="p-10">
        <div className="login-form">
          <form onSubmit={clearNavigation}>
            <div className="row w-100 pb-3">
              <div className="col">
                <div className="flex-row headerBtn">
                  <div className="headerBtn flex-row">
                  {navigation.length === 1 ? 
                    <input className="small-img disabled" type="image" src={backArrow}></input>
                    :
                    <input className="small-img" type="image" src={backArrow}></input>
                  }
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
          {page === "login" ? login : <div></div>}
          {page === "selectUserType" ? selectUserType : <div></div>}
          {page === "registration" ? registration : <div></div>}
          {page === "home" ? home : <div></div>}
          {page === "modify profile donor" ? modify_profile_donor : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default App;