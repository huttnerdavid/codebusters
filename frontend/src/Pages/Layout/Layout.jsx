import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from "../../Cookies/cookies";
import { LoginLogoutLi, StyledUl, StyledLink } from "../../Styles/Navbar.Styled";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const role = localStorage.getItem("role");
  const isAdmin = role === "Admin";
  const isLeader = role === "Leader";
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    logout();
    navigate("/");
    setShowLogoutModal(false);
    navigate("/");
  };

  const adminBtn = (
    <StyledLink to="/admin">
      <button type="button" className="nav-link active">Admin</button>
    </StyledLink>
  );

  return (
    <div className="Layout">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">Construction manager app</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li>
                <StyledLink to="/">
                  <button type="button" className="nav-link active">Home</button>
                </StyledLink>
              </li>
              <li>
                {!isLoggedIn ? (
                  <StyledLink to="/registration">
                    <button type="button" className="nav-link active">Registration</button>
                  </StyledLink>
                ) : (
                  <StyledUl>
                    <li>
                      {isAdmin&& adminBtn}
                      {(isLeader || isAdmin) && <StyledLink to="/users/1">
                        <button type="button" className="nav-link active">Users</button>
                      </StyledLink>}
                    </li>
                    <li>
                      {(isLeader || isAdmin) && <StyledLink to="/constructs/1">
                        <button type="button" className="nav-link active">Constructs</button>
                      </StyledLink>}
                    </li>
                    <li>
                      {isLeader && <StyledLink to="/companies/1">
                        <button type="button" className="nav-link active">Companies</button>
                      </StyledLink>}
                    </li>
                    <li>
                      {(isLeader || isAdmin) && <StyledLink to="/companyregistration">
                        <button type="button" className="nav-link active">Company Registration</button>
                      </StyledLink>}
                    </li>
                  </StyledUl>
                )}
              </li>
            </ul>
          </div>
          <div>
            <ul className="navbar-nav">
              <LoginLogoutLi className="navbar-nav">
                {isLoggedIn ? (
                  <button type="button" className="nav-link active" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <StyledLink to="/login">
                    <button type="button" className="nav-link active">Login</button>
                  </StyledLink>
                )}
              </LoginLogoutLi>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Layout;
