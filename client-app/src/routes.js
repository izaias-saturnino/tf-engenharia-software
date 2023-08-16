import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import FoodRequisition from "./routes/FoodRequisition.js";
import CreateEvent from "./routes/CreateEvent.js";
import GetDonationHistory from "./gets/GetDonationHistory.js";
import Requisitions from "./routes/Requisitions.js";
import GetRequisitions from "./gets/GetRequisitions.js";
import GetEvents from "./gets/GetEvents.js";

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
    path: "/get_events",
    element: <GetEvents/>
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
    path: "/registration/:user_type",
    element: <Registration/>
  },
  {
    path: "/registration",
    element: <SelectUserType/>
  },
  {
    path: "/select_user_type",
    element: <SelectUserType/>
  },
  {
    path: "/account_search/:search_query",
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
    path: "/donation_history/:kitchen_id",
    element: <DonationHistory/>
  },
  {
    path: '/get_donation_history',
    element: <GetDonationHistory/>
  },
  {
    path: '/get_donation_history/:kitchen',
    element: <GetDonationHistory/>
  },
  {
    path: "/donation/:kitchen_id",
    element: <Donation/>
  },
  {
    path: "/profile_kitchen/:kitchen",
    element: <ProfileKitchen/>
  },
  {
    path: "/get_profile_kitchen/:kitchen",
    element: <GetDonationHistory/>
  },
  {
    path: "/requisitions/:kitchen",
    element: <Requisitions/>
  },
  {
    path: "/get_requisitions/:kitchen",
    element: <GetRequisitions/>
  },
  {
    path: "/foodRequisition",
    element: <FoodRequisition/>
  },
  {
    path: "/createEvent",
    element: <CreateEvent/>
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