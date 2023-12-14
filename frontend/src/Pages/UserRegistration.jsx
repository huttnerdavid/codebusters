import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Cookies/cookies";
import Loading from "../Components/Loading";
import UserForm from "../Components/UserForm";

const fetchData = async (setCompanies) => {
  try {
    const response = await fetch(`/getCompanies`);
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

const UserRegistration = () => {
  const [companies, setCompanies] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const createEmployee = (user) => {
    const jsonPayload = JSON.stringify(user);
    return fetch(`/register`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    }).then((res) => {
      if(res.status === 201){
        alert("Successfully registered!");
        navigate("/");
      } else {
        alert("Something went wrong!");
      }
    });
  };

  useEffect(() => {
    fetchData(setCompanies);
    const setFilteredData = () => {
      fetchData(setCompanies);
    };
    const timeout = setTimeout(setFilteredData, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (user) => {
    setLoading(true);
    try {
      await createEmployee(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    navigate("/");
  }
    
  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <UserForm
          onSave = { handleSubmit }
          onCancel = { handleCancel }
          companies = { companies }/>
      )}
    </div>
  );
};

export default UserRegistration;
