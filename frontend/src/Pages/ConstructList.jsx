import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ConstructTable from "../Components/ConstructTable";

const ConstructList = () => {
  const [loading, setLoading] = useState(true);
  const [constructs, setConstructs] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`getConstructs`);
      const data = await response.json();
      if (response.ok) {
        setConstructs(data);
      } else {
        throw new Error('Failed to fetch construct data');
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
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <ConstructTable
          constructs = { constructs }
        />
      )}
    </div>
  );
};

export default ConstructList;
