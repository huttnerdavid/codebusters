import Loading from "../Components/Loading";
import CompanyTable from "../Components/CompanyTable";
import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const CompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState(undefined);
  const { page } = useParams();
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("role")?.toLowerCase() === "admin";
  const url = isAdmin ? "/getCompanies" : `/getOwnCompanies/${email}`;
  const comp = useFetch(url);
  const headers = ["Company name", "Zipcode", "City", "Street", "Door number", "Picked Company type", "Jobadder"];

  useEffect(() =>{
    setCompanies(comp);
    setLoading(false);
  }, [comp]);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <CompanyTable
          companies = { companies }
          page = { page }
          headers = { headers }/>
      )}
    </div>
  );
};

export default CompanyList;
