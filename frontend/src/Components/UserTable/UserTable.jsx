import React, { useState, useEffect } from 'react';
import PaginationForm from '../PaginationForm';

const UserTable = ({users, page}) => {
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
            <th className='table-primary'>
              <div>
                <div>
                  Username
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  First name
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Last name
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Gender
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Zipcode
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  City
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Street
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Door number
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Phone number
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  E-mail
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Registered date
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  User type
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Company Name
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Registration type
                </div> 
              </div>
            </th>
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
