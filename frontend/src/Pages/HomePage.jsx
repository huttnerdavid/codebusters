import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import HomePage from "../Components/HomePage";


const CompanyList = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <HomePage/>
      )}
    </div>
  );
};

export default CompanyList;
