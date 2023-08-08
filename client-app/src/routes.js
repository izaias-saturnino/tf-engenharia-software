import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Home from "./routes/Home.js";
import Login from "./routes/Login.js";
import ModifyProfile from "./routes/ModifyProfile.js";
import Registration from "./routes/Registration.js";
import SelectUserType from "./routes/SelectUserType.js";
import AccountSearch from "./routes/AccountSearch.js";
import Profile from "./routes/Profile.js";
import DonationHistory from "./routes/DonationHistory.js";
import ProfileKitchen from "./routes/ProfileKichen.js";
import Donation from "./routes/Donation.js";

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
  {
    path: "/account_search",
    element: <AccountSearch/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/donation_history",
    element: <DonationHistory/>
  },
  {
    path: "/donation",
    element: <Donation/>
  },
  {
    path: "/profile_kitchen",
    element: <ProfileKitchen/>
  },
  // {
  //   path: "*",
  //   element: <NotFound/>
  // },
])

const Router = (props) => {

    return(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

export default Router;