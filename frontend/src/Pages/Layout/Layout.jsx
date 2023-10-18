import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            Adhatsuk a weboldal nevet
          </li>
          <li>
            <Link to="/users">
              <button type="button">Users</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;