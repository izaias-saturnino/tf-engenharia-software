import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Home from "./routes/Home.js";
import Login from "./routes/Login.js";
import ModifyProfile from "./routes/ModifyProfile.js";
import Registration from "./routes/Registration.js";
import SelectUserType from "./routes/SelectUserType.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/modify_profile",
    element: <ModifyProfile/>
  },
  {
    path: "/registration",
    element: <Registration/>
  },
  {
    path: "/select_user_type",
    element: <SelectUserType/>
  },
])

const Router = (props) => {

    return(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

export default Router;