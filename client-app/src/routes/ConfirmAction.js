import React, { useState } from "react";

import eventLogo from '../images/eventLogo.png';

import AccountForm from "../components/AccountForm";
import { backend_base_url } from "../App";
import UpperMenu from "../components/UpperMenu";
import fetchContent from "../gets/Fetch";
import { Navigate, useParams } from "react-router-dom";

const Content = (props) => {
    return (
        <div>
            <div>
                <div className="justify-text gray-text pb-1 pt-3">
                    Deseja mesmo {props.action} esse usuário?
                </div>
                <div className="w-100 button-container pt-2">
                    <form className="flex center-content w-100" onSubmit={props.cancel}>
                        <input type="submit" className="form-btn" value="Cancelar"/>
                    </form>
                    <form className="flex center-content w-100" onSubmit={props.formFunction}>
                        <input type="submit" className="form-btn" value="Confirmar"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ConfirmAction = () => {

    var {action, user_id} = useParams();

    if(action === "delete"){
        action = "deletar";
    }
    if(action === "validate"){
        action = "validar";
    }

    //fetch profile
    var profile = {};

    const handleAction = (event) => {
        event.preventDefault();
    
        var end_point;
        var method;
        
        //ManagerIdentification: state.id,
        const item = {
            managerIdentification: state.id,
            userIdentification: user_id
        };  

        if(action === "deletar"){
            end_point = "DeleteRegistration";
            method = "DELETE";
        }
        if(action === "validar"){
            end_point = "ValidateKitchen";
            method = "PATCH";
        }

        let uri = backend_base_url+'/API/'+end_point;
    
        fetchContent(uri, JSON.stringify(item), method, (data)=>alert(data));
    };

    var upperCaseAction = action.charAt(0).toUpperCase() + action.slice(1);

    const state = { ...localStorage };

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    var userTypeText = (upperCaseAction === "Validar" ? "cozinha" : "usuário");

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return (
      <div>
        <UpperMenu/>
        <div className="app">
          <div className="p-10">
              <AccountForm title={upperCaseAction+" "+userTypeText} content={<Content userTypeText={userTypeText} profile={profile} action={action} formFunction={handleAction} cancel={backNavigation}/>} backNavigation="skip" />
          </div>
        </div>
      </div>
    )
};

export default ConfirmAction;