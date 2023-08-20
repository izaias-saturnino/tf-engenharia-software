import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import defaultProfilePic from '../images/default-profile-picture.png';

import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";
import fetchContent from "../gets/Fetch";

const Requisition = (props) => {

    const navigate = useNavigate();

    //console.log(props.requisition);

    const handleRequisition = (event) => {
        event.preventDefault();
        navigate("/donation/"+props.requisition.donationIdentification);
    }

    return (
        <form onSubmit={handleRequisition}>
            <div className={"search-item " + props.className}>
                {/* TODO add link */}
                <div className="search-item-properties">
                    <div className="mb-3"></div>
                    {/* <div className="search-item-propertie">
                        CNPJ: {props.requisition.CNPJ}
                    </div> */}
                    <div className="search-item-propertie">
                        Ingrediente: {props.requisition.name}
                    </div>
                    <div className="search-item-propertie">
                        Preço: {props.requisition.price}
                    </div>
                    <div className="search-item-propertie">
                        Quantidade: {props.requisition.quantity}
                    </div>
                    <div className="search-item-propertie">
                        Unidade: {props.requisition.unit}
                    </div>
                    {/* <div className="search-item-propertie">
                        Data: {props.requisition.date}
                    </div> */}
                </div>
                <div className="w-100 button-container pt-3">
                    <input type="submit" className="form-btn" value="Doe agora"/>
                </div>
            </div>
        </form>
    )
}

const updateResults = (setResults, content) =>{
    var results = []
    var requisitions = content;
    if(requisitions === undefined){
        requisitions = [];
    }
    
    for (var i = 0; i < requisitions.length; i++) {
        results.push(<Requisition className={"default-border-bottom"} requisition={requisitions[i]}/>);
    }
    if(results.length === 0){
        results.push(<div className="pt-3">Ainda não há doações disponíveis</div>);
    }
    else{
        results.push(<div className="pt-3">Fim dos resultados</div>);
    }
    setResults(results);
}

const Requisitions = (props) => {

    const {kitchen_id} = useParams();

    const state = {...localStorage};

    //fetch kitchen
    const [profile, setKitchen] = useState({});
    useEffect(()=>{
        fetchContent(backend_base_url+'/API/AccessKitchenProfile', kitchen_id, 'POST',
        (data)=>{
            setKitchen(data.kitchen);
        });
    }, [kitchen_id]);
    
    //fetch requisitions
    const [results, setResults] = useState([]);
    useEffect(()=>{
        fetchContent(backend_base_url+'/API/Donate/DisplayDonationRequests', kitchen_id, 'POST',
        (data)=>{
            console.log(data);
            updateResults(setResults, data);
        });
    }, [kitchen_id]);

    if(!state.isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return (
        <div>
            <SearchPage before_content={
                <div className="kitchen-profile justify-text min-w-100">
                    <div>
                        <img className="w-100 h-50" src={defaultProfilePic}></img>
                        <div className="p-2rem">
                            <div className="title">{profile.name}</div>
                            <div className="profile-properties">
                                <div>
                                    {profile.emailAddress}
                                </div>
                                <div>
                                {profile.location}
                                </div>
                                {/* <ProfileProp propName={"Email"} propValue={profile.emailAddress}/> */}
                                {/* <ProfileProp propName={"Telefone"} propValue={profile.Telefone}/> */}
                                {/* <ProfileProp propName={"Endereço"} propValue={profile.location}/> */}
                                {/* <ProfileProp propName={"CNPJ"} propValue={profile.CNPJ}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            } title={"Fazer uma doação"} results={results} placeholder={undefined}/>
        </div>
    )
};

export default Requisitions;