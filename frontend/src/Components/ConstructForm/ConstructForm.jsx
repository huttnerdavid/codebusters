import React, { useState } from 'react';

const ConstructForm = ({ construct, onSave, onCancel, company, companies }) => {
  const [constructName, setConstructName] = useState(construct?.constructName ?? "");
  const [companyName, setCompanyName] = useState(construct?.companyName ?? "");
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
    <form className="ConstructForm" onSubmit = { onSubmit }>
      <div className="control">
        {construct != null ? (
          <>
            <label htmlFor="construct">Company name:</label>
            <select
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              name="companyName"
              id="companyName"
            >
              {companyName ? null : <option>{companyName}</option>}
              {companies != null && companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </>
        ) : (
          <>
            <label htmlFor="construct">Company name:</label>
            <div>{company}</div>
          </>
        )}
      </div>
      
      <div className="control">
        <label htmlFor="construct">Construct name:</label>
        <input
          value={constructName}
          onChange={(e) => setConstructName(e.target.value)}
          name="constructName"
          id="constructName"
        />
      </div>

      <div className="control">
        <label htmlFor="construct">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          name="status"
          id="status"
          >
            {status? null : <option value="NotStarted">Not started yet</option>}
            <option value="OnGoing">Ongoing</option>
        </select>
      </div>

      <div className="control">
        <label htmlFor="construct">Workers count:</label>
        <input
          value={workerCount}
          onChange={(e) => setWorkerCount(e.target.value)}
          name="workerCount"
          id="workerCount"
        />
      </div>

      <div className="buttons">
        <button type="submit">
          {construct ? "Update Construct" : "Create Construct"}
        </button>
        <button type="button" onClick = { onCancel }>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ConstructForm;
