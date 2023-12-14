import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { getToken } from "./Cookies/cookies";
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
import HomePage from "./Pages/HomePage";
import ContactPage from "./Pages/ContactPage";

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
          element: <HomePage/>
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
        },
        {
          path: "/contact",
          element: <ContactPage/>
        }
      ],
    },
  ]);

  return (

        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
 
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
