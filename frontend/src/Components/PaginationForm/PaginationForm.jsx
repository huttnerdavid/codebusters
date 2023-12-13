import React, { useEffect } from 'react';
import { StyledUl, StyledLi } from "../../Styles/Table.Styles"
import { useNavigate } from 'react-router-dom';

const ConstructTable = ({element, url, page, recordPerPage, setRecordPerPage, paginationSlice, setPaginationSlice}) => {
  const navigate = useNavigate();

  useEffect(() => {
    setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  }, [page]);
  
  const handlePreviousButton = () => {
    navigate(`/${url}/${Number(page) - 1}`);
  };

  const handleNextButton = () => {
    navigate(`/${url}/${Number(page) + 1}`);
  };

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
    <nav aria-label="Page navigation example">
      <StyledUl  className="pagination">
        <li className="page-item">
          <button className="btn btn-primary btn-floating mb-4" style={{marginLeft: "1vw"}} onClick={() => handlePreviousButton()} disabled={paginationSlice.first === 0}>Previous</button>
        </li>
        <li className="page-item">
          <button className="btn btn-primary btn-floating mb-4" style={{marginLeft: "1vw"}} onClick={() => handleNextButton()} disabled={element && paginationSlice.second + 1 >= element.length} >Next</button>
        </li>
        <StyledLi>
          <select className="btn btn-primary"  style={{marginRight: "1vw"}} onChange = {(event) => handleRecordPerPageButton(event.target.value)} disabled={element && element.length <= 10}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </StyledLi>
      </StyledUl>
    </nav>
  );
};

export default ConstructTable;
