import React from "react";

import foodLogo from '../images/foodLogo.png';

import AccountForm from "../components/AccountForm";

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
              <input placeholder="Quantidade" type="text" name="Quanitity" required />
          </div>
          <div className="input-container">
              <input placeholder="Unidades" type="number" name="Unity" required />
          </div>
          <div className="input-container">
              <input placeholder="Preço" type="text" name="Price" required />
          </div>
          <div className="w-100 button-container">
              <input type="submit" value="Criar Requisição"/>
          </div>
      </form>
    </div>
  )
}

const FoodRequisition = () => {

    const state = { ...localStorage };

    const handleFoodRequisition = (event) => {
        event.preventDefault();
    
        var { Name, Quanitity, Unity, Price } = document.getElementsByClassName("main-form")[0];
    
        let uri = 'https://e30a-143-54-52-136.ngrok-free.app/API/RequestDonation';
    
        const item = {
          Id: state.id,
          Name: Name.value,
          Quanitity: Quanitity.value,
          Unity: Unity.value,
          Price: Price.value
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
              alert("Doação requisitada com sucesso.");
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
            <AccountForm title={"Criar pedido de doação"} content={<Content formFunction={handleFoodRequisition}/>}/>
        </div>
      </div>
    )
};

export default FoodRequisition;