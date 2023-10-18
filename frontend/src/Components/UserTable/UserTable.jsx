import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Loading from "../Loading";
import "./UserTable.css";

const UserTable = ({workers}) => {

  const navigate = useNavigate();

  return (
    <div className="UserTable">
      <table>
        <thead>
          <tr>
            <th>
              <div className="header">
                <div className="name">
                  Id<br/>
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
            <td>{workers.registrationType}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
