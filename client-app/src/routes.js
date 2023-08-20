import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home.js";
import Login from "./routes/Login.js";
import ModifyProfile from "./routes/ModifyProfile.js";
import Registration from "./routes/Registration.js";
import SelectUserType from "./routes/SelectUserType.js";
import AccountSearch from "./routes/AccountSearch.js";
import DonationHistory from "./routes/DonationHistory.js";
import ProfileKitchen from "./routes/ProfileKichen.js";
import Donation from "./routes/Donation.js";
import FoodRequisition from "./routes/FoodRequisition.js";
import CreateEvent from "./routes/CreateEvent.js";
import Requisitions from "./routes/Requisitions.js";
import ConfirmAction from "./routes/ConfirmAction.js";
import Payment from "./routes/Payment.js";

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
    path: "/account_search/:query",
    element: <AccountSearch/>
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
    path: "/donation/:requisition_id",
    element: <Donation/>
  },
  {
    path: "/profile_kitchen/:kitchen",
    element: <ProfileKitchen/>
  },
  {
    path: "/requisitions/:kitchen_id",
    element: <Requisitions/>
  },
  {
    path: "/foodRequisition",
    element: <FoodRequisition/>
  },
  {
    path: "/createEvent",
    element: <CreateEvent/>
  },
  {
    path: "/confirm_action/:action/:user_id",
    element: <ConfirmAction/>
  },
  {
    path: "/payment/:requisition_id",
    element: <Payment/>
  }
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