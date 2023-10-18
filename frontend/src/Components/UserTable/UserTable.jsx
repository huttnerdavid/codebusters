import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./UserTable.css";

const UserTable = ({workers}) => {

  const navigate = useNavigate();

  const splitRegType = (data) => {
    if (data.match(/([A-Z].*?[A-Z].*?)/)) {
      return data.replace(/([A-Z])/g, ' $1');
    } else {
      return data;
    }
  }

  return (
    <div className="UserTable">
      <table>
        <thead>
          <tr>
            <th>
              <div className="header">
                <div className="id">
                  Id
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="name">
                  Name
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="password">
                  Password
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
                <div className="registrationType">
                  Registration type
                </div> 
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={workers.id}>
            <td>{workers.id}</td>
            <td>{workers.userName}</td>
            <td>{workers.password}</td>
            <td>{workers.firstName}</td>
            <td>{workers.lastName}</td>
            <td>{workers.gender}</td>
            <td>{workers.address.zipCode}</td>
            <td>{workers.address.city}</td>
            <td>{workers.address.street}</td>
            <td>{workers.address.doorNumber}</td>
            <td>{workers.phoneNumber}</td>
            <td>{workers.email.address}</td>
            <td>{workers.registrationDate}</td>
            <td>{workers.userType}</td>
            <td>{splitRegType(workers.registrationType)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
