import React from 'react';

const UserTable = ({users}) => {

  return (
    <div>
      <table className='table table-dark table-striped-columns'>
        <thead>
          <tr>
            <th>
              <div>
                <div>
                  Username
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  First name
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  Last name
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  Gender
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  Zipcode
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  City
                </div> 
              </div>
            </th>
              <th>
                <div>
                  <div>
                    Street
                  </div> 
                </div>
            </th>
            <th>
              <div>
                <div>
                  Door number
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  Phone number
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  E-mail
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  Registered date
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  User type
                </div> 
              </div>
            </th>
            <th>
              <div>
                <div>
                  Company Name
                </div> 
              </div>
            </th>
            <th>
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
    </div>
  );
};

export default UserTable;
