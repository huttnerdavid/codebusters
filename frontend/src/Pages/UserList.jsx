import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import UserTable from "../Components/UserTable";
import useFetch from "../Hooks/useFetch";


const UserList = ({port}) => {
  
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const usersData = useFetch("/getUsers");

  useEffect(() => {
    if (usersData != null && users == null){
      setUsers(usersData);
      setLoading(false);
    }
  }, [usersData]);

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