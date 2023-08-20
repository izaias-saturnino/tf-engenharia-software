import React from "react";

import eventLogo from '../images/eventLogo.png';

import AccountForm from "../components/AccountForm";
import { backend_base_url } from "../App";
import UpperMenu from "../components/UpperMenu";
import fetchContent from "../gets/Fetch";
import { Navigate } from "react-router-dom";

const Content = (props) => {
  return (
    <div>
      <form className="main-form" onSubmit={props.formFunction}>
          <div className="justify-text gray-text pb-1">
            Marque um evento para divulgar sua cozinha!
          </div>
          <div className="pt-5 px-10">
              <img className="pl-1 w-100" src={eventLogo}></img>
          </div>
          <div className="input-container">
              <input placeholder="Local do evento" type="text" name="Location" required />
          </div>
          <div className="input-container">
              <input placeholder="Data do evento" id="datePickerId" type="date" name="Date" required />
          </div>
          <div className="input-container">
              <input placeholder="Público esperado" type="number" name="Public" required />
          </div>
          <div className="w-100 button-container">
              <input type="submit" className="form-btn" value="Criar Evento"/>
          </div>
      </form>
    </div>
  )
}

const CreateEvent = () => {

    const state = { ...localStorage };

    const handleEventCreation = (event) => {
        event.preventDefault();
    
        var { Date, Location, Public } = document.getElementsByClassName("main-form")[0];
    
        let uri = backend_base_url+'/API/Event';
    
        const item = {
          kitchenIdentification: state.id,
          /*Date: Date.value,*/
          location: Location.value,
          public: Public.value,
        };
    
        fetchContent(uri, JSON.stringify(item), 'POST', (data)=>alert(data));
    };

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return (
      <div>
        <UpperMenu/>
        <div className="app">
          <div className="p-10">
              <AccountForm title={"Criar evento"} content={<Content formFunction={handleEventCreation}/>} backNavigation="skip" />
          </div>
        </div>
      </div>
    )
};

export default CreateEvent;