import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../images/doaresLogo.png';
import backArrow from '../images/backArrow.png';

const AccountForm = (props) => {

    const backNavigation = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
        <div className="login-form">
            {props.backNavigation === undefined ?
                <form onSubmit={backNavigation}>
                    <div className="row w-100 pb-3">
                        <div className="col">
                            <div className="flex-row headerBtn">
                                <div className="headerBtn flex-row">
                                    <input className="small-img disabled" type="image" src={backArrow}></input>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col">
                        <div className="flex-row right-content">
                            <div className="pb-5 headerBtn flex-row">
                            <input type="submit" value="H"/>
                            </div>
                        </div>
                        </div> */}
                    </div>
                </form>
                :
                <div></div>
            }
            <div>
                <div className="title">{props.title}</div>
                {props.content}
            </div>
        </div>
    )
};

export default AccountForm;