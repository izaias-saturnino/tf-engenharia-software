import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import defaultProfilePic from '../images/default-profile-picture.png';

import AccountForm from "../components/AccountForm";
import { backend_base_url } from "../App";

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
          <input placeholder="Senha atual" type="password" name="current_pass" />
        </div>
        <div className="input-container">
          <input placeholder="Nome" type="text" name="username" />
        </div>
        <div className="input-container">
          <input placeholder="Endereço" type="text" name="address" />
        </div>
        <div className="input-container">
          <input placeholder="Nova senha" type="password" name="new_pass" />
        </div>
        <div className="input-container">
          <input placeholder="Digite a nova senha novamente" type="password" name="new_pass2" />
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

    console.log(state);

    const user_type = state.utype;

    const navigate = useNavigate();

    const handleModifyProfile = (event) => {
      event.preventDefault();
    
      var { current_pass, username, addres, new_pass, new_pass2 } = document.getElementsByClassName("main-form")[0];

      let end_points = ["Password", "Name", "EmailAddres", "", ""];

      if(new_pass.value !== new_pass2.value){
        alert("As duas senhas precisam ser iguais.");
        return;
      }

      let url_user_type = user_type == '"cozinha solidária"' ? "kitchen" : "donor";
  
      let uri = backend_base_url+'/API/ChangeAccountInformation/'+url_user_type+"/"+"Password";
  
      const item = {
        identification: state.id,
        password: current_pass.value,
        change: new_pass.value,
      };

      console.log(item);
  
      var resp_ok = true;
  
      fetch(uri, {
        method: 'PATCH',
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