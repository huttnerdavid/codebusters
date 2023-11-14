import React, { useState } from "react";
import ConstructForm from "../Components/ConstructForm";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";

const createConstruct = (construct, port) => {
    const jsonPayload = JSON.stringify(construct);
    return fetch(`http://localhost:${port}/constructRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    }).then((res) => res.json());
  };

const ConstructRegistration = ({port}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {companyName} = useParams();

    const handleSubmit = (data) => {
        setLoading(true);
        createConstruct(data, port);
        setLoading(false);
        navigate("/");
        alert(`${data.constructName} sent to the database!`);
    }

    const handleCancel = () => {
        navigate("/");
    }

    return (
      <div>
        {loading? (
          <Loading />
        ) : (
          <ConstructForm
            onSave = { handleSubmit }
            onCancel = { handleCancel }
            company = { companyName }
          />
        )}
      </div>
    );
};

export default ConstructRegistration;
