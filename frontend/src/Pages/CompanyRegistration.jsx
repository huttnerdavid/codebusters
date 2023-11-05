import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import CompanyForm from "../Components/CompanyForm";
import { useNavigate } from "react-router-dom";

const createCompany = (company) => {
  const jsonPayload = JSON.stringify(company);
  return fetch("http://localhost:5293/CompanyRegister", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPayload,
  }).then((res) => res.json());
};

const CompanyRegistration = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  }

  const handleSubmit = (company) => {
    console.log(company);
    setLoading(true);
    createCompany(company, setData);
    setLoading(false);
    navigate("/");
    alert("Successfully registered!");
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <CompanyForm
          onSave = { handleSubmit }
          onCancel = { handleCancel }
        />
      )}
    </div>
  );
};

export default CompanyRegistration;