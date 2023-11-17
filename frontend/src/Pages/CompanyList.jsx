import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import CompanyTable from "../Components/CompanyTable";

const fetchData = async (setCompanies) => {
  try {
    const response = await fetch(`getCompanies`);
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

const CompanyList = () => {
  
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    fetchData(setCompanies);
      const setFilteredData = () => {
        fetchData();
        setLoading(false);
      };
      const timeout = setTimeout(setFilteredData, 1000);
      return () => clearTimeout(timeout);
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
