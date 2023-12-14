import React, { useState } from "react";
import Loading from "../Components/Loading";
import Contacts from "../Components/ContactsForm/Contact";

const CompanyList = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <Contacts/>
      )}
    </div>
  );
};

export default CompanyList;
