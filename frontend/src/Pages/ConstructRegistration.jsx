import React, { useState } from "react";
import ConstructForm from "../Components/ConstructForm";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { getToken } from "../Cookies/cookies";

const ConstructRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {companyName} = useParams();

    const createConstruct = (construct) => {
      const jsonPayload = JSON.stringify(construct);
      return fetch(`/constructRegister`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + getToken(),
          "Content-Type": "application/json",
        },
        body: jsonPayload,
      }).then((res) => {
        if(res.status === 201){
          alert(`${construct.constructName} sent to the database!`);
          navigate("/companies");
        } else {
          alert("Something went wrong!");
        }
      });
    };

    const handleSubmit = (data) => {
        setLoading(true);
        createConstruct(data);
        setLoading(false);
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
