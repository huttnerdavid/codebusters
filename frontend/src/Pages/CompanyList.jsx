import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import CompanyTable from "../Components/CompanyTable";

const fetchData = async (port, setCompanies) => {
  try {
    const response = await fetch(`http://localhost:${port}/getCompanies`);
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

const CompanyList = ({port}) => {
  
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    fetchData(port, setCompanies);
      const setFilteredData = () => {
        fetchData();
        setLoading(false);
      };
      const timeout = setTimeout(setFilteredData, 1000);
      return () => clearTimeout(timeout);
  }, [port]);

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
