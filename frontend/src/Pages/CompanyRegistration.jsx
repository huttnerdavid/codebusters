import { useState } from "react";
import Loading from "../Components/Loading";
import CompanyForm from "../Components/CompanyForm";
import { useNavigate } from "react-router-dom";

const createCompany = (company, port) => {
  const jsonPayload = JSON.stringify(company);
  return fetch(`http://localhost:${port}/CompanyRegister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPayload,
  }).then((res) => res.json());
};

const CompanyRegistration = ({port}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  }

  const handleSubmit = (company) => {
    setLoading(true);
    createCompany(company, port);
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
