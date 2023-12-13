import React, { useState } from 'react';
import { StyledUl, StyledLi } from "../../Styles/Table.Styles"

const ConstructTable = ({constructs}) => {
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [paginationSlice, setPaginationSlice] = useState({first: 0, second: recordPerPage});

  const handlePreviousButton = () => {
    setPaginationSlice((prevSlice) => ({
      first: Number(prevSlice.first) - recordPerPage,
      second: Number(prevSlice.second) - recordPerPage
    }));
  }

  const handleNextButton = () => {
    setPaginationSlice((prevSlice) => ({
      first: Number(prevSlice.first) + recordPerPage,
      second: Number(prevSlice.second) + recordPerPage
    }));
  }

  const handleRecordPerPageButton = (number) => {
    setRecordPerPage(Number(number));
    setPaginationSlice((prevSlice) => {
      return {
        ...prevSlice,
        second: Number(number)
      };
    })
  }

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
           {constructs && constructs?.slice(paginationSlice.first, paginationSlice.second).map((construct, index) => (
            <tr key={construct.id} style={{ backgroundColor: index % 2 === 1 ? '#f2f2f2' : '' }}>
              <td>{construct.name}</td>
              <td>{construct.companyName}</td>
              <td>{construct.status}</td>
              <td>{construct.workerCount}</td>
            </tr>
          ))} 
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <StyledUl  className="pagination">
          <li className="page-item"><a className="page-link" onClick={() => handlePreviousButton()}>Previous</a></li>
          <li className="page-item"><a className="page-link"  onClick={() => handleNextButton()}>Next</a></li>
          <StyledLi>
            <select className="page-link" onChange = {(event) => handleRecordPerPageButton(event.target.value)}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </StyledLi>
        </StyledUl>
      </nav>
    </div>
  );
};

export default ConstructTable;
