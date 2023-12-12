import React from 'react';
import "./ConstructTable.css";

const ConstructTable = ({constructs}) => {

  return (
    <div className="ConstructTable">
      <table>
        <thead>
          <tr>
            <th>
              <div className="header">
                <div className="name">
                  Construct name
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="companyName">
                  Company name
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="status">
                  Status
                </div> 
              </div>
            </th>
            <th>
              <div className="header">
                <div className="count">
                  Workers available
                </div> 
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
           {constructs && constructs?.map((construct) => (
            <tr key={construct.id}>
              <td>{construct.name}</td>
              <td>{construct.companyName}</td>
              <td>{construct.status}</td>
              <td>{construct.workerCount}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};

export default ConstructTable;
