import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import useFetch from "../../Hooks/useFetch";
import { getToken } from "../../Cookies/cookies";

export default function UserManager(){
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const userData = useFetch("/getUsers");

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

    async function deleteUser(email){
        fetch("/admin/deleteUser?email=" + email, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        })
        .then(r => console.log(r.ok))
        .catch(e => console.error(e));
    }

    if (loading || !users){
        return <Loading />
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Gender</th>
                    <th>Zipcode</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>Door number</th>
                    <th>Phone number</th>
                    <th>E-mail</th>
                    <th>Registered date</th>
                    <th>User type</th>
                    <th>Company Name</th>
                    <th>Registration type</th>
                    <th>Action</th>
                    <th />
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
                                <button onClick={(e) => manageUser(e, user)}>Edit</button>
                                <button onClick={(e) => deleteUser(user.item2.email)}>Delete</button>
                            </td>
                        </tr>
            ))} 
            </tbody>
        </table>
    );
}