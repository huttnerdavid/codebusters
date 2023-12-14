import PaginationForm from "../../Components/PaginationForm";
import Loading from "../../Components/Loading";
import useFetch from "../../Hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { getToken } from "../../Cookies/cookies";
import { useParams } from "react-router-dom";

export default function PendingCeos(){
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [ceos, setCeos] = useState(null);
  const [loading, setLoading] = useState(true);
  const ceosData = useFetch("/admin/getPendingCeo");
  const { page } = useParams();
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  const userManagerHeaders = ["Username", "First name", "Last name", "Gender", "Zipcode", "City", "Street", "Door", "Phone number", "E-mail", "Registered date", "User type", "Company Name", "Registration type", "Approve"];

  useEffect(() => {
    setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  }, [page]);

  useEffect(() => {
    if (role?.toLowerCase() !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    setCeos(ceosData);
    setLoading(false);
  },[ceosData]);

  const Approve = (e, email) => {
    const response = fetch("/admin/approveLeadership?email=" + email, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
      }
    })
    .then(res => {
      if (res.ok){
          const newUsers = ceos.filter(u => u.item2.email !== email);
          setCeos(newUsers);
      }
    })
    .catch(e => alert(e.message));
    }

  if (loading){
    return <Loading />
  }

  return (
    <div>
      <table className="table table-striped table-hover">
      <thead>
          <tr>
            {userManagerHeaders.map(header => (
              <th key={header} className='table-primary'>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ceos && ceos.slice(paginationSlice.first, paginationSlice.second).map((user) => (
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
              <td><Button onClick={(e) => Approve(e, user.item2.email)}></Button></td>
            </tr>
          ))} 
        </tbody>
      </table>
      <PaginationForm 
        element = { ceos }
        page = { page }
        url = { "/admin/pendingCeos" }
        recordPerPage = { recordPerPage }
        setRecordPerPage = { setRecordPerPage }
        paginationSlice = { paginationSlice }
        setPaginationSlice = { setPaginationSlice }/>
    </div>
  );
}
