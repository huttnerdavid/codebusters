import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import { logout } from "../../Cookies/cookies";

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    //Show the logout confirmation modal
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    //Perform the logout action
    setIsLoggedIn(false);
    logout();
    //Close the modal after logout
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    //Close the modal without logging out
    setShowLogoutModal(false);
  };

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">Construction manager app</li>
          <li>
            {!isLoggedIn ? (
              <Link to="/registration">
                <button type="button">Registration</button>
              </Link>
            ) : (
              <>
                <Link to="/users">
                  <button type="button">Users</button>
                </Link>
                <Link to="/constructs">
                  <button type="button">Constructs</button>
                </Link>
                <Link to="/companies">
                  <button type="button">Companies</button>
                </Link>
                <Link to="/companyregistration">
                  <button type="button">Company Registration</button>
                </Link>
              </>
            )}
            {isLoggedIn ? (
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button type="button">Login</button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to logout?</p>
            <Link to="/">
              <button onClick={confirmLogout}>Yes</button>
            </Link>
            <button onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
