import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import UserTable from "../Components/UserTable";

const UserList = () => {
  
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5293/getUsers");
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
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
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <UserTable
          users = { users }
        />
      )}
    </div>
  );
};

export default UserList;