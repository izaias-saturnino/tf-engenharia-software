import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Login from "./Login.js";

const KitchenResult = (props) => {
    return (
        <div className={"search-item " + props.className}>
            {/* TODO: add navigation to kitchen profile */}
            <div className="title2 link">
                {props.kitchen.name}
            </div>
            <div className="search-item-properties">
                <div className="search-item-propertie">
                    {props.kitchen.addres}
                </div>
                {/* <div className="search-item-propertie">
                    CEP: 123456789
                </div>
                <div className="search-item-propertie">
                    Email: <a>cozinhasolidaria@gmail.com</a>
                </div>
                <div className="search-item-propertie">
                    Telefone: (99) 987654321
                </div>
                <div className="search-item-propertie">
                    Whatsapp: (99) 987654321
                </div>
                <div className="search-item-propertie">
                    Site: cozinhasolidaria.com.br
                </div> */}
            </div>
        </div>
    )
}

const KitchenSearch = (props) => {
    let results = [];
    let i = 0;
    if(props.kitchens != undefined){
        for (i = 0; i < props.kitchens.length; i++) {
            results.push(<KitchenResult className={"default-border-bottom"} kitchen={props.kitchens[i]}/>);
        }
    }

    //let kitchensTest = {"name": "name", "addres": "addres"};
    //results.push(<KitchenResult className={"default-border-bottom"} kitchen={kitchensTest}/>);

    if(props.search != undefined){
        if(results.length == 0){
            results.push(<div className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
        }
        else{
            results.push(<div className="pt-5">Fim dos resultados.</div>);
        }
    }

    //results.push(<div className="pt-5">Fim dos resultados.</div>);

    return (
        <div className="app">
            <div className="p-10">
                <div className="login-form justify-text">
                    <div>
                        <div className="title">Cozinhas Solidárias</div>
                        <div>
                            <form className="main-form">
                                <div className="input-container">
                                    <input placeholder="Pesquisar por cozinhas" type="text" name="search" />
                                </div>
                            </form>
                        </div>
                        <div className="search-results">
                            {results}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default KitchenSearch;