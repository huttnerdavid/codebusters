import PaginationForm from '../PaginationForm';
import React, { useState, useEffect } from 'react';

const UserTable = ({users, page, headers}) => {
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});

  useEffect(() => {
    setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  }, [page]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className='table-primary'>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
           {users && users?.map((user) => (
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
            </tr>
          ))} 
        </tbody>
      </table>
      <PaginationForm 
        element = { users }
        page = { page }
        url = { "users" }
        recordPerPage = { recordPerPage }
        setRecordPerPage = { setRecordPerPage }
        paginationSlice = { paginationSlice }
        setPaginationSlice = { setPaginationSlice }
      />
    </div>
  );
};

export default UserTable;
