import React, { useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from "../../Cookies/cookies";
import { LoginLogoutLi, StyledUl, StyledNavContainer, StyledNavContainerChild1, StyledNavContainerChild2, StyledNavContainerChild3, StyledNavContainerChild4, StyledLink } from "../../Styles/Navbar.Styled";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    logout();
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="Layout">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Construction manager app</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li>
                <StyledLink to="/">
                  <button type="button" className="nav-link active">Home</button>
                </StyledLink>
              </li>
              {!isLoggedIn ? (
                // <StyledUl>
                //   <li>
                //     <StyledLink to="/registration">
                //       <button type="button" className="nav-link active">Registration</button>
                //     </StyledLink>
                //   </li>
                // </StyledUl>
                <div/>
              ) : (
                <StyledUl>
                  <li>
                    <StyledLink to="/users/1">
                      <button type="button" className="nav-link active">Users</button>
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/constructs/1">
                      <button type="button" className="nav-link active">Constructs</button>
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/companies/1">
                      <button type="button" className="nav-link active">Companies</button>
                    </StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/companyregistration">
                      <button type="button" className="nav-link active">Company Registration</button>
                    </StyledLink>
                  </li>
                </StyledUl>
              )}
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
        keyboard={false}
      >
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
