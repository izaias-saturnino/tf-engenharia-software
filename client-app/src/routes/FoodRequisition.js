import React, { useState } from "react";

import foodLogo from '../images/foodLogo.png';

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
            Faça um pedido de doação para a sua cozinha!
          </div>
          <div className="pt-5 px-10">
              <img className="w-100" src={foodLogo}></img>
          </div>
          <div className="input-container">
              <input placeholder="Nome do produto" type="text" name="Name" required />
          </div>
          <div className="input-container">
              <input placeholder="Quantidade" type="text" name="Quantity" required />
          </div>
          <div className="input-container">
              <select name="Unit" required >
                <option value="" disabled selected>Unidade</option>
                <option value="Quilos">Quilos</option>
                <option value="Litros">Litros</option>
                <option value="Gramas">Gramas</option>
                <option value="Bandejas">Bandejas</option>
              </select>
          </div>
          <div className="input-container">
              <input placeholder="Preço" type="text" name="Price" required />
          </div>
          <div className="w-100 button-container">
              <input type="submit" className="form-btn" value="Criar Requisição"/>
          </div>
      </form>
    </div>
  )
}

const FoodRequisition = () => {

    const state = { ...localStorage };

    const handleFoodRequisition = (event) => {
        event.preventDefault();
    
        var { Name, Quantity, Unit, Price } = document.getElementsByClassName("main-form")[0];
    
        let uri = backend_base_url+'/API/RequestDonation';
    
        const item = {
          kitchenIdentification: state.id,
          Name: Name.value,
          Quantity: Quantity.value,
          Unit: Unit.value,
          Price: Price.value
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
              <AccountForm title={"Criar pedido de doação"} content={<Content formFunction={handleFoodRequisition}/>} backNavigation="skip"/>
          </div>
        </div>
      </div>
    )
};

export default FoodRequisition;