import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import UserForm from "../Components/UserForm";

const UserRegistration = () => {
  
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <UserForm
          users = { users }
        />
      )}
    </div>
  );
};

export default UserRegistration;