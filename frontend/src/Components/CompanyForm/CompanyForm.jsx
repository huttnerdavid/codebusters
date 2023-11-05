import { useState, useEffect } from "react";
import Loading from "../Loading";

const CompanyForm = ({ onSave, company, onCancel }) => {

  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState(company?.companyName ?? "");
  const [zipCode, setZipCode] = useState(company?.zipCode ?? "");
  const [city, setCity] = useState(company?.city ?? "");
  const [street, setStreet] = useState(company?.street ?? "");
  const [doorNumber, setDoorNumber] = useState(company?.doorNumber ?? "");
  const [pickedCompanyType, setpickedCompanyType] = useState(company?.pickedCompanyType ?? "");

  //submit function
  const onSubmit = (e) => {
    e.preventDefault();

    if (company) {
      return onSave({
        ...company,
        companyName,
        zipCode,
        city,
        street,
        doorNumber,
        pickedCompanyType
      });
    }

    return onSave({
      companyName,
      zipCode,
      city,
      street,
      doorNumber,
      pickedCompanyType
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form className="CompanyForm" onSubmit={onSubmit}>
      
      <div className="control">
        <label htmlFor="companyName">Company name:</label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          name="companyName"
          id="companyName"
        />
      </div>

      <div className="control">
        <label htmlFor="zipCode">Zipcode:</label>
        <input
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          name="zipCode"
          id="zipCode"
        />
      </div>

      <div className="control">
        <label htmlFor="city">City:</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          name="city"
          id="city"
        />
      </div>

      <div className="control">
        <label htmlFor="street">Street:</label>
        <input
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          name="street"
          id="street"
        />
      </div>

      <div className="control">
        <label htmlFor="houseNumber">House number:</label>
        <input
          value={doorNumber}
          onChange={(e) => setDoorNumber(e.target.value)}
          name="houseNumber"
          id="houseNumber"
        />
      </div>

      <div className="control">
        <label htmlFor="regType">Registration type:</label>
        <select
          value={pickedCompanyType}
          onChange={(e) => setpickedCompanyType(e.target.value)}
          name="regType"
          id="regType"
        >
          {pickedCompanyType ? null : <option value="">Select registration type!</option>}
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </div>

      <div className="buttons">
        <button type="submit">
          {company ? "Update Company" : "Create Company"}
        </button>
        <button type="button" onClick = { onCancel }>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
