import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import logo from './images/doaresLogo.png';

function App() {

  // React States
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [utype, setUtype] = useState("");
  const [navigation, setNavigation] = useState(["login"]);
  const [validatedKitchen, setValidatedKitchen] = useState(false);

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
    if(isLoggedIn){
      setNavigation(["home"]);
      setPage("home");
    }
    else{
      setNavigation(["login"]);
      setPage("login");
    }
  }

  function logout(){
    //send logout request

    setisLoggedIn(false);
    setUsername("");
    setUtype("");
    //clearNavigation();
  }

  const loginCreateAccountButtonAction = (event) => {
    event.preventDefault();
    goNavigation("selectUserType");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    var { email, pass } = document.forms[0];

    let uri = 'https://luis-felipe-de-freitas-marques.sa-1.sharedwithexpose.com/API/SignIn';

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
        console.log(data);
        if(resp_ok){
          setUsername(email.value);
          setisLoggedIn(true);
          var str = getUtype(data.actor_type);
          setUtype(str);
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
      .catch(error => console.error(error));

  };

  const login = (
    <div className="form">
      <div className="title">Login</div>
      <form onSubmit={handleLogin}>
        <div className="center-text gray-text pb-1">
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
      <div className="center-text gray-text pb-1">
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

    var { username, address, email, pass, pass2 } = document.forms[1];

    if(pass.value !== pass2.value){
      alert("As duas senhas precisam ser iguais.");
      return;
    }

    var user_type = utype === "doador" ? "donor" : "kitchen";

    let uri = 'https://luis-felipe-de-freitas-marques.sa-1.sharedwithexpose.com/API/SignUp/'+user_type;

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
        console.log(data);
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
      .catch(error => console.error(error));
  };

  const registration = (
    <div className="form">
      <div className="title">Criar Conta</div>
      <form onSubmit={handleRegistration}>
        <div className="center-text gray-text pb-1">
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

  //console.log(navigation);

  return (
    <div className="app">
      <div className="login-form">
        {navigation.length === 1 ? 
          <div></div>
        :
        <form onSubmit={clearNavigation}>
          <div className="row w-100 pb-3">
            <div className="col">
              <div className="flex-row headerBtn">
                <div className="headerBtn flex-row">
                <input type="submit" value="<"/>
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
        }
        {page === "login" ? login : <div></div>}
        {page === "selectUserType" ? selectUserType : <div></div>}
        {page === "registration" ? registration : <div></div>}
        {page === "home" ? home : <div></div>}
      </div>
    </div>
  );
}

export default App;