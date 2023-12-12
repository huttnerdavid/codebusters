import { useNavigate } from "react-router-dom";
import { StyledLink } from "../Styles/Navbar.Styled";
import { useEffect } from "react";

const AdminPage = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role?.toLowerCase() !== "admin") {
            navigate("/");
        }
    }, [role, navigate]);

    return (
        <div className="admin-container">
            <StyledLink to="/admin/pendingCeos">
                <button type="button" className="nav-link active">Pending Leader requests</button>
            </StyledLink>
        </div>
    );
}

export default AdminPage;