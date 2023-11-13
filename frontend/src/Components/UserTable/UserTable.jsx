import React from 'react';
import "./UserTable.css";

const UserTable = ({users}) => {
  console.log(users[0]);

  return (
    <div className="UserTable">
      <table>
        <thead>
          <tr>
            <th>
              <div className="header">
                <div className="name">
                  Username
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="firstName">
                  First name
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="lastName">
                  Last name
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="gender">
                  Gender
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="zipCode">
                  Zipcode
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="city">
                  City
                </div> 
              </div>
            </th>
              <th>
                <div className="header">
                  <div className="street">
                    Street
                  </div> 
                </div>
            </th>
            <th>
              <div className="header">
                <div className="doorNumber">
                  Door number
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="phoneNumber">
                  Phone number
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="email">
                  E-mail
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="registeredDate">
                  Registered date
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="userType">
                  User type
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="companyType">
                  Company Name
                </div> 
              </div>
            </th>
          </tr>
            <th>
              <div className="header">
                <div className="registrationType">
                  Registration type
                </div> 
              </div>
            </th>
        </thead>
        <tbody>
           {users.map((user) => (
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
