import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import defaultProfilePic from '../images/default-profile-picture.png';

const ModifyProfile = (props) => {

    const location = useLocation();
    const [state, setState] = useState(location.state);

    const navigate = useNavigate();

    const handleModifyDonor = (event) => {
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
        <div className="form">
          <div className="title">Modificar Informações</div>
          <form className="main-form" onSubmit={backNavigation}>
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
    )
};

export default ModifyProfile;