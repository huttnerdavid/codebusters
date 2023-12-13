import React, { useState, useEffect } from 'react';
import PaginationForm from '../PaginationForm';

const ConstructTable = ({constructs, page, headers}) => {
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});

  useEffect(() => {
    setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  }, [page]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className='table-primary'>{header}</th>
            ))}
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
      <PaginationForm 
        element = { constructs }
        page = { page }
        url = { "constructs" }
        recordPerPage = { recordPerPage }
        setRecordPerPage = { setRecordPerPage }
        paginationSlice = { paginationSlice }
        setPaginationSlice = { setPaginationSlice }/>
    </div>
  );
};

export default ConstructTable;
