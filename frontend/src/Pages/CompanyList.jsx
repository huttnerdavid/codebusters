import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import CompanyTable from "../Components/CompanyTable";
import useFetch from "../Hooks/useFetch";

const CompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState(undefined);
  const email = localStorage.getItem("email");
  const comp = useFetch("/getOwnCompanies/" + email);
  console.log(email);

  useEffect(() =>{
    setCompanies(comp);
    setLoading(false);
  }, [comp]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <CompanyTable
          companies = { companies }
        />
      )}
    </div>
  );
};

export default CompanyList;
