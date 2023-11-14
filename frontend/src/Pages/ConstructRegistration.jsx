import React, { useState } from "react";
import ConstructForm from "../Components/ConstructForm";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

const createConstruct = (construct) => {
    const jsonPayload = JSON.stringify(construct);
    return fetch("http://localhost:5293/constructRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    }).then((res) => res.json());
  };

const ConstructRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (data) => {
        setLoading(true);
        createConstruct(data);
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
          />
        )}
      </div>
    );
};

export default ConstructRegistration;
