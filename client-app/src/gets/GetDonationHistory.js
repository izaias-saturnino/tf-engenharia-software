import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "../routes/Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";

const GetDonationHistory = (props) => {

    const navigate = useNavigate();

    const {kitchen_id} = useParams();

    const state = { ...localStorage };

    if(kitchen_id !== undefined){
        //fetch kitchen donations
    
        let uri = backend_base_url+'/API/KitchenHistory';
    
        var resp_ok = true;
    
        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: kitchen_id
        })
            .then((resp) => {
                if(resp.status === 400){
                    resp_ok = false;
                }
                return resp.json();
            })
            .then((data) => {
                if(resp_ok){
                    localStorage.setItem('donations', data.donations);
                    localStorage.setItem('kitchen', data.kitchen);
                    console.log("resp_ok");
                    navigate("/donation_history/" + kitchen_id);
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
    }
    else{
        let uri = backend_base_url+'/API/DonationHistory';
    
        var resp_ok = true;
    
        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: state.id
        })
            .then((resp) => {
                if(resp.status === 400){
                    resp_ok = false;
                }
                return resp.json();
            })
            .then((data) => {
                if(resp_ok){
                    localStorage.setItem('donations', JSON.stringify(data));
                    console.log("resp_ok");
                    navigate("/donation_history");
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
    }

    return (
        <div></div>
    )
};

export default GetDonationHistory;