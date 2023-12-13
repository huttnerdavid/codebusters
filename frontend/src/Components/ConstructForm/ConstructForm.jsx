import React, { useState } from 'react';
import { RegistrationContainer } from "../../Styles/Registration.Styled";

const ConstructForm = ({ construct, onSave, onCancel, company, companies }) => {
  const [constructName, setConstructName] = useState(construct?.constructName ?? "");
  const [companyName, setCompanyName] = useState(construct?.companyName ?? `${company}`);
  const [status, setStatus] = useState(construct?.status ?? "");
  const [workerCount, setWorkerCount] = useState(construct?.workerCount ?? "");

  const onSubmit = (e) => {
    e.preventDefault();

    if (construct) {
      return onSave({
        ...construct,
        constructName,
        companyName,
        status,
        workerCount
      });
    }

    return onSave({
        constructName,
        companyName,
        status,
        workerCount
    });
  };

  return (
    <RegistrationContainer className="ConstructForm" onSubmit = { onSubmit }>
      {construct != null ? (
        <div>
          <label className="form-label" htmlFor="companyName">Company name:</label>
          <select
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            name="companyName"
            id="companyName">
            {companyName ? null : <option>{companyName}</option>}
            {companies != null && companies.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mb-3">
          <label className="form-label" htmlFor="construct">Company name:</label>
          <input className="form-control" disabled value={company}/>
        </div>
      )}
      <div className="mb-3">
        <label className="form-label" htmlFor="constructName">Construct name:</label>
        <input
          value={constructName}
          onChange={(e) => setConstructName(e.target.value)}
          className="form-control"
          name="constructName"
          id="constructName"/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="status">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select" 
          name="status"
          id="status">
            {status? null : <option value="">Pick your status!</option>}
            <option value="NotStarted">Not started yet</option>
            <option value="OnGoing">Ongoing</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="construct">Workers count:</label>
        <input
          value={workerCount}
          onChange={(e) => setWorkerCount(e.target.value)}
          name="workerCount"
          className="form-control"
          id="workerCount"/>
      </div>
      <div className="buttons">
        <button type="submit" className="btn btn-primary btn-floating mb-4">
          {construct ? "Update Construct" : "Create Construct"}
        </button>
        <button type="button" className="btn btn-primary btn-floating mb-4" onClick = { onCancel } style={{marginLeft: "1vw"}}>
          Cancel
        </button>
      </div>
    </RegistrationContainer>
  );
};

export default ConstructForm;
