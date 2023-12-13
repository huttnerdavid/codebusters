import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "../../Hooks/useFetch";
import Loading from "../../Components/Loading";
import { Button } from "react-bootstrap";
import { getToken } from "../../Cookies/cookies";
import { useParams } from "react-router-dom";
import PaginationForm from "../../Components/PaginationForm";

export default function PendingCeos(){
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [ceos, setCeos] = useState(null);
  const [loading, setLoading] = useState(true);
  const ceosData = useFetch("/admin/getPendingCeo");
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
    });
  }

  if (loading){
    return <Loading />
  }

  return (
    <div>
      <table className='table table-dark table-striped-columns'>
        <thead>
          <tr>
            <th  className='table-primary'>
              <div>
                <div>
                  Username
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  First name
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Last name
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Gender
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Zipcode
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  City
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Street
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Door number
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Phone number
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  E-mail
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Registered date
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  User type
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Company Name
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Registration type
                </div> 
              </div>
            </th>
            <th  className='table-primary'>
              <div>
                <div>
                  Approve
                </div> 
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {ceos && ceos?.map((user) => (
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
        url = { "companies" }
        recordPerPage = { recordPerPage }
        setRecordPerPage = { setRecordPerPage }
        paginationSlice = { paginationSlice }
        setPaginationSlice = { setPaginationSlice }/>
    </div>
  );
}