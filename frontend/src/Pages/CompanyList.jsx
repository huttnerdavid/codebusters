import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import CompanyTable from "../Components/CompanyTable";

const CompanyList = () => {
  
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5293/getCompanies");
      const data = await response.json();
      if (response.ok) {
        setCompanies(data);
      } else {
        throw new Error('Failed to fetch employee data');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
      const setFilteredData = () => {
        fetchData();
        setLoading(false);
      };
      const timeout = setTimeout(setFilteredData, 1000);
      return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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