import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import UserList from "./Pages/UserList";
import UserRegistration from "./Pages/UserRegistration";

import CompanyList from "./Pages/CompanyList";
import CompanyRegistration from "./Pages/CompanyRegistration";

import "./index.css";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <div className="welcome-text">Welcome to the page! Click on the Users button if you want to see the user dummy data!</div>
        },
        {
          path: "/users",
          element: <UserList />,
        },
        {
          path: "/registration",
          element: <UserRegistration />,
        },
        {
          path: "/companies",
          element: <CompanyList />,
        },
        {
          path: "/companyregistration",
          element: <CompanyRegistration />,
        },
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
