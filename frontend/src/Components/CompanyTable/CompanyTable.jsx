import React, { useState, useEffect } from 'react';
import PaginationForm from '../PaginationForm';
import { useNavigate } from 'react-router-dom';

const Company = ({companies, page, headers}) => {
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  const navigate = useNavigate();

  useEffect(() => {
    setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage -1});
  }, [page]);

  const handleAddConstruct = (name) => {
    navigate(`/company/construct/${name}`);
  }

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
           {companies && companies.slice(paginationSlice.first, paginationSlice.second).map((company) => (
            <tr key={company.companyName}>
              <td>{company.companyName}</td>
              <td>{company.zipCode}</td>
              <td>{company.city}</td>
              <td>{company.street}</td>
              <td>{company.doorNumber}</td>
              <td>{company.pickedCompanyType}</td>
              <td><button className="btn btn-primary btn-floating mb-4" onClick = { () => handleAddConstruct(company.companyName) }>Add construct</button></td>
            </tr>
          ))} 
        </tbody>
      </table>
      <PaginationForm 
        element = { companies }
        page = { page }
        url = { "companies" }
        recordPerPage = { recordPerPage }
        setRecordPerPage = { setRecordPerPage }
        paginationSlice = { paginationSlice }
        setPaginationSlice = { setPaginationSlice }/>
    </div>
  );
};

export default Company;
