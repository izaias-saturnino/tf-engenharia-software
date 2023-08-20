import React, { useState } from "react";

import eventLogo from '../images/eventLogo.png';

import AccountForm from "../components/AccountForm";
import { backend_base_url } from "../App";
import UpperMenu from "../components/UpperMenu";
import fetchContent from "../gets/Fetch";
import { useParams } from "react-router-dom";

const Content = (props) => {
    var isKitchen = props.profile.utype === "kitchen";
    return (
        <div>
            <div className={"search-item " + props.className}>
                {isKitchen ?
                    <div className="title2 link" to={"/profile_kitchen/"+props.profile.identification}>
                        {props.profile.name}
                    </div>
                    :
                    <div className="title2">
                        {props.profile.name}
                    </div>
                }
                <div className="search-item-properties">
                    <div className="mb-3"></div>
                    <div className="search-item-propertie">
                        {props.profile.email}
                    </div>
                    {isKitchen ?
                    <div>
                        <div className="search-item-propertie">
                            {props.profile.addres}
                        </div>
                        <div className="search-item-propertie">
                            CNPJ: {props.profile.CNPJ}
                        </div>
                    </div>
                    :
                    <div></div>
                    }
                </div>
            </div>
            <div>
                <div className="justify-text gray-text pb-1">
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

    var [user, setUser] = useState({});

    //fetch user profile? yes
    //fetchContent(uri, '', 'POST', (data)=>setUser(data));

    if(action === "delete"){
        action = "deletar";
    }
    if(action === "validate"){
        action = "validar";
    }

    var upperCaseAction = action.charAt(0).toUpperCase() + action.slice(1);

    const state = { ...localStorage };

    const handleAction = (event) => {
        event.preventDefault();
    
        let uri = backend_base_url+'/API/';
    
        fetchContent(uri, user_id, 'POST', (data)=>alert(data));
    };

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    // user = {
    //     "identification": 1,
    //     "name": "name",
    //     "addres": "Av. Bento Gonçalves, n° 1",
    //     "utype": "kitchen",
    //     "CNPJ" : "987654321",
    //     "email": "kitchen@email.com"
    // };
    // user2 = {
    //     "identification": 2,
    //     "name": "name",
    //     "utype": "donor",
    //     "email": "donor@email.com"
    // };

    return (
      <div>
        <UpperMenu/>
        <div className="app">
          <div className="p-10">
              <AccountForm title={upperCaseAction+" usuário"} content={<Content profile={user} action={action} formFunction={handleAction} cancel={backNavigation}/>} backNavigation="skip" />
          </div>
        </div>
      </div>
    )
};

export default ConfirmAction;