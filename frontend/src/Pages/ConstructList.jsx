import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ConstructTable from "../Components/ConstructTable";
import useFetch from "../Hooks/useFetch";
import { useParams } from 'react-router-dom';

const ConstructList = () => {
  const [loading, setLoading] = useState(true);
  const [constructs, setConstructs] = useState(null);
  const constr = useFetch("getConstructs");
  const { page } = useParams();
  
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
          page = { page }/>
      )}
    </div>
  );
};

export default ConstructList;
