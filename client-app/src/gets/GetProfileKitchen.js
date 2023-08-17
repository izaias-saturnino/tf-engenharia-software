import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "../routes/Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";

const GetProfileKitchen = (props) => {

    const navigate = useNavigate();

    const {kitchen_id} = useParams();

    const state = { ...localStorage };

    let uri = backend_base_url+'/API/AccessKitchenProfile';

    var resp_ok = true;

    console.log(kitchen_id);

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
                localStorage.setItem('kitchen_profile', JSON.stringify(data.kitchen));
                localStorage.setItem('events', JSON.stringify(data.events));
                console.log(data.kitchen);
                console.log(data.events);
                console.log("resp_ok");
                navigate("/profile_kitchen/" + kitchen_id);
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

    return (
        <div></div>
    )
};

export default GetProfileKitchen;