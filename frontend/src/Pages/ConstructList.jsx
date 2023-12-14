import Loading from "../Components/Loading";
import ConstructTable from "../Components/ConstructTable";
import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ConstructList = () => {
  const [loading, setLoading] = useState(true);
  const [constructs, setConstructs] = useState(null);
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("role")?.toLowerCase() === "admin";
  const url = isAdmin ? "/getConstructs" : `/getOwnConstructs/${email}`;
  const constr = useFetch(url);
  const { page } = useParams();
  const headers = ["Construct name", "Company name", "Status", "Workers available"];
  
  useEffect(() => {
      setConstructs(constr);
      setLoading(false);
  }, [constr]);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <ConstructTable
          constructs = { constructs }
          page = { page }
          headers = { headers }/>
      )}
    </div>
  );
};

export default ConstructList;
