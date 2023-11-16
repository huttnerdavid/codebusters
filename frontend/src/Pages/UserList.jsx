import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import UserTable from "../Components/UserTable";
import useFetch from "../Hooks/useFetch";

const UserList = () => {
  
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const usersData = useFetch("/getUsers");

  useEffect(() => {
    if (usersData != null && users == null){
      const setFilteredData = () => {
        setUsers(usersData);
        setLoading(false);
      };
      const timeout = setTimeout(setFilteredData, 1000);
      return () => clearTimeout(timeout);
    }
  }, [users, usersData]);

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
