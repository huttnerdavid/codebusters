import Loading from "../Components/Loading";
import CompanyForm from "../Components/CompanyForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Cookies/cookies";

const CompanyRegistration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createCompany = (company) => {
    const jsonPayload = JSON.stringify(company);
    return fetch(`/companyRegister`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    }).then((res) => {
      if(res.status === 201){
        alert("Successfully registered!");
        navigate("/companies/1");
      } else {
        alert("Something went wrong!");
      }
    });
  };

  const handleSubmit = (company) => {
    setLoading(true);
    createCompany(company);
    setLoading(false);
  }

  const handleCancel = () => {
    navigate("/");
  }

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <CompanyForm
          onSave = { handleSubmit }
          onCancel = { handleCancel }/>
      )}
    </div>
  );
};

export default CompanyRegistration;
