import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import useFetch from "../../Hooks/useFetch";
import { getToken } from "../../Cookies/cookies";
import PaginationForm from "../../Components/PaginationForm";
import { useParams } from "react-router-dom";

export default function UserManager(){
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const userData = useFetch("/getUsers");
  const { page } = useParams();
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});

  useEffect(() => {
    setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  }, [page]);

  useEffect(() => {
    if (role?.toLowerCase() !== "admin") {
        navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    setUsers(userData);
    setLoading(false);
  }, [userData]);

    function manageUser(e, user){

    }

    async function deleteUser(e, email){
        fetch("/admin/deleteUser?email=" + email, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        })
        .then(res => {
            if (res.ok){
                const newUsers = users.filter(u => u.item2.email !== email);
                setUsers(newUsers);
            }
        })
        .catch(e => alert(e.message));
    }

  if (loading || !users){
      return <Loading />
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className='table-primary'>Username</th>
            <th className='table-primary'>First name</th>
            <th className='table-primary'>Last name</th>
            <th className='table-primary'>Gender</th>
            <th className='table-primary'>Zipcode</th>
            <th className='table-primary'>City</th>
            <th className='table-primary'>Street</th>
            <th className='table-primary'>Door number</th>
            <th className='table-primary'>Phone number</th>
            <th className='table-primary'>E-mail</th>
            <th className='table-primary'>Registered date</th>
            <th className='table-primary'>User type</th>
            <th className='table-primary'>Company Name</th>
            <th className='table-primary'>Registration type</th>
            <th className='table-primary'>Action</th>
            <th className='table-primary'></th>
          </tr>
        </thead>
        <tbody>
        {users && users.map((user) => (
          <tr key={user.item1.id}>
            <td>{user.item2.userName}</td>
            <td>{user.item1.firstName}</td>
            <td>{user.item1.lastName}</td>
            <td>{user.item1.gender}</td>
            <td>{user.item1.zipCode}</td>
            <td>{user.item1.city}</td>
            <td>{user.item1.street}</td>
            <td>{user.item1.doorNumber}</td>
            <td>{user.item2.phoneNumber}</td>
            <td>{user.item2.email}</td>
            <td>{user.item1.registrationDate}</td>
            <td>{user.item1.userType}</td>
            <td>{user.item1.companyNameByDatabase}</td>
            <td>{user.item1.registrationType}</td>
            <td>
              <button className="btn btn-primary btn-floating mb-4" onClick={(e) => manageUser(e, user)}>Edit</button>
            </td>
            <td>
              <button className="btn btn-primary btn-floating mb-4" onClick={(e) => deleteUser(user.item2.email)}>Delete</button>
            </td>
          </tr>
        ))} 
        </tbody>
    </table>
    <PaginationForm 
      element = { users }
      page = { page }
      url = { "companies" }
      recordPerPage = { recordPerPage }
      setRecordPerPage = { setRecordPerPage }
      paginationSlice = { paginationSlice }
      setPaginationSlice = { setPaginationSlice }/>
    </div>
  );
}