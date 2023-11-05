import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();

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
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;