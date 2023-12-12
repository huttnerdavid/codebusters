import React from 'react';

const ConstructTable = ({constructs}) => {

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className='table-primary'>
              <div>
                <div>
                  Construct name
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Company name
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Status
                </div> 
              </div>
            </th>
            <th className='table-primary'>
              <div>
                <div>
                  Workers available
                </div> 
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
           {constructs && constructs?.map((construct, index) => (
            <tr key={construct.id} style={{ backgroundColor: index % 2 === 1 ? '#f2f2f2' : '' }}>
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
