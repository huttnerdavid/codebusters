import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// import "./index.css";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import UserList from "./Pages/UserList";
import UserRegistration from "./Pages/UserRegistration";

import CompanyList from "./Pages/CompanyList";
import CompanyRegistration from "./Pages/CompanyRegistration";

import ConstructRegistration from "./Pages/ConstructRegistration";
import ConstructList from "./Pages/ConstructList";

import LoginPage from "./Pages/LoginPage";
import { getToken } from "./Cookies/cookies";

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
      let token = getToken()

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
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <div className="welcome-text">{isLoggedIn ? (
                                                                  "You are logged in!"
                                                                ) : (
                                                                  <>
                                                                    Welcome to the page! Click on the{" "}
                                                                    <Link to="/login">
                                                                      Login
                                                                    </Link> button if You are not registered!
                                                                  </>
                                                                )}</div>
        },
        {
          path: "/users",
          element: <UserList/>,
        },
        {
          path: "/registration",
          element: <UserRegistration/>,
        },
        {
          path: "/constructs",
          element: <ConstructList/>,
        },
        {
          path: "/companies",
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
