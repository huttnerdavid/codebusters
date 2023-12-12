import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    if (localStorage.getItem("role").toLowerCase() !== "admin") {
        navigate("/");
    }
    

    
}

export default AdminPage;