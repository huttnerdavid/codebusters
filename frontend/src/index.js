import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { getToken } from "./Cookies/cookies";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import UserList from "./Pages/UserList";
import UserRegistration from "./Pages/UserRegistration";

import CompanyList from "./Pages/CompanyList";
import CompanyRegistration from "./Pages/CompanyRegistration";

import ConstructRegistration from "./Pages/ConstructRegistration";
import ConstructList from "./Pages/ConstructList";

import LoginPage from "./Pages/LoginPage";
import PendingCeos from "./Pages/Admin/PendingCeos";
import UserManager from "./Pages/Admin/UserManager";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let token = getToken()

    if (token != null && isLoggedIn){
      return;
    } else if (token){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    const id = setInterval(() => {
      let token = getToken();

      if (token != null && isLoggedIn){
        return;
      } else if (token == null && isLoggedIn){
        setIsLoggedIn(false);
        window.location.reload();
        alert("You were logged out by the server!")
      } else if (token){
        setIsLoggedIn(true);
      }
    }, 60000);
    
    return () => clearInterval(id);
  },[isLoggedIn]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: 
            <div className="welcome-text">
              {isLoggedIn ? (
                "You are logged in!"
              ) : (
                <div>
                  Welcome to the page! Click on the{" "}
                  <Link to="/login">
                    Login
                  </Link> button if You are not registered!
                </div>
              )}
            </div>
        },
        {
          path: "/users/:page",
          element: <UserList/>,
        },
        {
          path: "/registration",
          element: <UserRegistration/>,
        },
        {
          path: "/constructs/:page",
          element: <ConstructList/>,
        },
        {
          path: "/companies/:page",
          element: <CompanyList/>,
        },
        {
          path: "/companyregistration",
          element: <CompanyRegistration/>,
        },
        {
          path: "company/construct/:companyName",
          element: <ConstructRegistration/>,
        },
        {
          path: "/login",
          element: <LoginPage setIsLoggedIn={setIsLoggedIn}/>
        },
        {
          path: "/admin/pendingCeos/:page",
          element: <PendingCeos/>
        },
        {
          path: "/admin/userManager/:page",
          element: <UserManager/>
        }
      ],
    },
  ]);

  return (
    <React.StrictMode>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
