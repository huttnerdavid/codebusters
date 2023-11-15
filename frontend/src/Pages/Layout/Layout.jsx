import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import { logout } from "../../Cookies/cookies";

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {

  const logoutEvent = () => {
    setIsLoggedIn(false);
    logout();
    window.location.reload();
  }

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            Construction manager app
          </li>
          <li>
            <Link to="/users">
              <button type="button">Users</button>
            </Link>
            <Link to="/registration">
              <button type="button">Registration</button>
            </Link>
            <Link to="/companies">
              <button type="button">Companies</button>
            </Link>
            <Link to="/companyregistration">
              <button type="button">Company Registration</button>
            </Link>
            {isLoggedIn ? 
            <button type="button" onClick={logoutEvent}>Logout</button>
            :
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
            }
            
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;