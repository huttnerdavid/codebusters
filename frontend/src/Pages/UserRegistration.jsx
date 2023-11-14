import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import UserForm from "../Components/UserForm";
import { useNavigate } from "react-router-dom";

const createEmployee = (user, port) => {
  const jsonPayload = JSON.stringify(user);
  return fetch(`http://localhost:${port}/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPayload,
  }).then((res) => res.json());
};

const fetchData = async (port, setCompanies) => {
  try {
    const response = await fetch(`http://localhost:${port}/getCompanies`);
    const data = await response.json();

    if (response.ok) {
      setCompanies(data);
    } else {
      throw new Error('Failed to fetch employee data');
    }
  } catch (err) {
    console.log(err);
  }
};

const UserRegistration = ({port}) => {
  const [companies, setCompanies] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate("/");
  }
    
  useEffect(() => {
    fetchData(port, setCompanies);
    const setFilteredData = () => {
      fetchData(port, setCompanies);
    };
    const timeout = setTimeout(setFilteredData, 1000);
    return () => clearTimeout(timeout);
  }, []);
  

  const handleSubmit = (user) => {
    
    setLoading(true);
    createEmployee(user, port);
    setLoading(false);
    navigate("/");
    alert("Successfully registered!");
  }
  
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <UserForm
          onSave = { handleSubmit }
          onCancel = { handleCancel }
          companies = { companies }
        />
      )}
    </div>
  );
};

export default UserRegistration;