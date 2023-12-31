import Loading from "../../Components/Loading";
import PaginationForm from "../../Components/PaginationForm";
import useFetch from "../../Hooks/useFetch";
import { getToken } from "../../Cookies/cookies";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const headers =  ["First name", "Last name", "Zipcode", "City", "Street", "Door", "E-mail", "Registered date", "User type", "Company", "Type", "Action", ""];

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
  
  function deleteUser(email){
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
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className='table-primary'>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users && users.slice(paginationSlice.first, paginationSlice.second).map((user) => (
            <tr key={user.item1.id}>
              <td>{user.item1.firstName}</td>
              <td>{user.item1.lastName}</td>
              <td>{user.item1.zipCode}</td>
              <td>{user.item1.city}</td>
              <td>{user.item1.street}</td>
              <td>{user.item1.doorNumber}</td>
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
      url = { "admin/userManager" }
      recordPerPage = { recordPerPage }
      setRecordPerPage = { setRecordPerPage }
      paginationSlice = { paginationSlice }
      setPaginationSlice = { setPaginationSlice }/>
    </div>
  );
}
