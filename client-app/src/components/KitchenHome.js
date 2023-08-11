import React from "react";
import { Link } from 'react-router-dom';
import kitchenLogo from '../images/kitchenLogo.png';
import verify from '../images/verify.png';

const KitchenHome = (props) => {

    return (
        <div className="kitchen-profile">
                <div className="kitchen-profile-container">
                    <div className="title">{(props.state.username) } 
                    </div>
                    {props.state.validatedKitchen === "true" && (
                        <div className="pt-10 px-20">
                            <img className="verify-mark" src={verify}></img>
                        </div> )}  
                </div>
            <div className="pt-5 px-10">
                <img className="w-100" src={kitchenLogo}></img>
            </div>    
            <Link to="foodRequisition">
                <div className="w-100 button-container">
                    <input type="submit" value="Criar pedido de doação"/>
                </div>
            </Link>
            <Link to="createEvent">
                <div className="w-100 button-container">
                    <input type="submit" value="Criar Evento"/>
                </div>
            </Link>
      </div>
    )
};

export default KitchenHome