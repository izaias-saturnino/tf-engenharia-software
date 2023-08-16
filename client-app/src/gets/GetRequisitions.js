import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import Login from "../routes/Login";
import SearchPage from "../components/SeachPage"
import { backend_base_url } from "../App";

const GetRequisitions = (props) => {

    const navigate = useNavigate();

    const {kitchen_id} = useParams();

    const state = { ...localStorage };

    let uri = backend_base_url+'/API/';

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
                localStorage.setItem('requisitions', data.requisitions);
                localStorage.setItem('kitchen_profile', data.kitchen);
                console.log("resp_ok");
                navigate("/requisitions/" + kitchen_id);
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

export default GetRequisitions;