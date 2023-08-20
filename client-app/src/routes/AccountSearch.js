import React from "react";

import SearchPage from "../components/SeachPage.js";
import { Link, useParams } from "react-router-dom";

export const AccountResult = (props) => {
    var isKitchen = props.profile.utype === "kitchen";

    if(!isKitchen && !props.admin){
        return (<div></div>);
    }

    return (
        <div className={"search-item " + props.className}>
            {isKitchen ?
                <Link className="title2 link" to={"/profile_kitchen/"+props.profile.identification}>
                    {props.profile.name}
                </Link>
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
            {props.admin?
            <div className="pt-3 flex center-content">
                {isKitchen ?
                <form className="d-flex right-content w-100 px-2">
                    <input type="submit" className="form-btn" value="Validar"/>
                </form>
                :
                <div></div>
                }
                <form className={"d-flex left-content px-2 "+(isKitchen ? "w-100" : "")}>
                    <input type="submit" className="form-btn" value="Deletar"/>
                </form>
            </div>
            :
            <div></div>
            }
        </div>
    )
}

const AccountSearch = (props) => {

    const {query} = useParams();

    //fetch profiles
    var profiles = [];
    const state = { ...localStorage };
    if(state.utype === "doador"){
        //fetch profiles as donor
    }
    else{
        //fetch profiles as manager
    }

    var admin = state.utype === 0;
    //admin = true;

    let results = [];

    // let profileTest = {
    //     "identification": 1,
    //     "name": "name",
    //     "addres": "Av. Bento Gonçalves, n° 1",
    //     "utype": "kitchen",
    //     "CNPJ" : "987654321",
    //     "email": "kitchen@email.com"
    // };
    // results.push(<AccountResult className={"default-border-bottom"} profile={profileTest} admin={admin}/>);
    // profileTest = {
    //     "identification": 2,
    //     "name": "name",
    //     "utype": "donor",
    //     "email": "donor@email.com"
    // };
    // results.push(<AccountResult className={"default-border-bottom"} profile={profileTest} admin={admin}/>);

    if(query !== undefined){
        for (var i = 0; i < profiles.length; i++) {
            results.push(<AccountResult key={"result"+i} className={"default-border-bottom"} profile={profiles[i]}/>);
        }
        if(profiles.length === 0){
            results.push(<div key={"final result"} className="pt-3">Não houveram resultados para a sua pesquisa.</div>);
        }
        else{
            results.push(<div key={"final result"} className="pt-5">Fim dos resultados.</div>);
        }
    }

    return (
        <SearchPage title={"Resultados"} results={results} placeholder={"Pesquisar"}/>
    )
};

export default AccountSearch;