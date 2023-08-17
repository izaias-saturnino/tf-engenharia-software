import React, { useState } from "react";
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import { backend_base_url } from "../App";

const getKitchen = async (kitchen_id) => {

    let uri = backend_base_url+'/API/AccessKitchenProfile';

    var resp_ok = true;

    var response = await fetch(uri, {
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
                console.log("resp_ok");
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

    var data;
    if(response == undefined){
        data = {};
    }
    else{
        data = await response.json();
    }
    return data.kitchen;
};

export default getKitchen;