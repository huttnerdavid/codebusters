import React, { useState, useEffect } from 'react';
import { StyledUl, StyledLi } from "../../Styles/Table.Styles"
import { useNavigate } from 'react-router-dom';

const ConstructTable = ({constructs, page}) => {
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  const navigate = useNavigate();

  useEffect(() => {
    setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  }, [page]);
  
  const handlePreviousButton = () => {
    navigate(`/constructs/${Number(page) - 1}`)
  }

  const handleNextButton = () => {
    navigate(`/constructs/${Number(page) + 1}`)
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
           {constructs && constructs.slice(paginationSlice.first, paginationSlice.second).map((construct, index) => (
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
          <li className="page-item">
            <button className="btn btn-primary btn-floating mb-4"  style={{marginLeft: "1vw"}} onClick={() => handlePreviousButton()} disabled={paginationSlice.first === 0}>Previous</button>
          </li>
          <li className="page-item">
            <button className="btn btn-primary btn-floating mb-4"  style={{marginLeft: "1vw"}} onClick={() => handleNextButton()} disabled={constructs && paginationSlice.second > constructs.length} >Next</button>
          </li>
          <StyledLi>
            <select className="btn btn-primary"  style={{marginRight: "1vw"}} onChange = {(event) => handleRecordPerPageButton(event.target.value)}>
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
