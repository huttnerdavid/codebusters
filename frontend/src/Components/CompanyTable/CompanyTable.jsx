import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./CompanyTable.css";

const Company = ({companies}) => {

  const navigate = useNavigate();

console.log(companies);
  return (
    <div className="CompanyTable">
      <table>
        <thead>
          <tr>
            <th>
              <div className="header">
                <div className="name">
                  Company name
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
                <div className="registrationType">
                  Picked Company type
                </div> 
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
           {companies.map((company) => (
            <tr key={company.company}>
              <td>{company.companyName}</td>
              <td>{company.zipCode}</td>
              <td>{company.city}</td>
              <td>{company.street}</td>
              <td>{company.doorNumber}</td>
              <td>{company.pickedCompanyType}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};

export default Company;
