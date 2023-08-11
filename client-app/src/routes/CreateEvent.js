import React from "react";

import eventLogo from '../images/eventLogo.png';

import AccountForm from "../components/AccountForm";

const Content = (props) => {
  return (
    <div>
      <form className="main-form" onSubmit={props.formFunction}>
          <div className="justify-text gray-text pb-1">
            Marque um evento para divulgar sua cozinha!
          </div>
          <div className="pt-5 px-10">
              <img className="w-100" src={eventLogo}></img>
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
              <input type="submit" value="Criar Evento"/>
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
    
        let uri = 'https://e30a-143-54-52-136.ngrok-free.app/API/RequestDonation';
    
        const item = {
          Id: state.id,
          Date: Date.value,
          Location: Location.value,
          Public: Public.value,
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
              alert("Evento criado com sucesso.");
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

    return (
      <div className="app">
        <div className="p-10">
            <AccountForm title={"Criar evento"} content={<Content formFunction={handleEventCreation}/>}/>
        </div>
      </div>
    )
};

export default CreateEvent;