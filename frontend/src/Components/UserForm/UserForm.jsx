import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RegistrationContainer } from "../../Styles/Registration.Styled";

const UserForm = ({ onSave, user, onCancel, companies }) => {

  const [userName, setUserName] = useState(user?.userName ?? "");
  const [password, setPassword] = useState(user?.password ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [zipCode, setZipCode] = useState(user?.zipCode ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [street, setStreet] = useState(user?.street ?? "");
  const [doorNumber, setDoorNumber] = useState(user?.doorNumber ?? "");
  const [userType, setUserType] = useState(user?.userType ?? "");
  const [companyNameByDatabase, setCompanyNameByDatabase] = useState(user?.companyNameByDatabase ?? "");
  const [registrationType, setRegistrationType] = useState(user?.registrationType ?? "");

  const onSubmit = (e) => {
    e.preventDefault();

    if (user) {
      return onSave({
        ...user,
        userName,
        password,
        email,
        phoneNumber,
        firstName,
        lastName,
        gender,
        zipCode,
        city,
        street,
        doorNumber,
        userType,
        companyNameByDatabase,
        registrationType
      });
    }

    return onSave({
      userName,
      password,
      email,
      phoneNumber,
      firstName,
      lastName,
      gender,
      zipCode,
      city,
      street,
      doorNumber,
      userType,
      companyNameByDatabase,
      registrationType
    });
  };

  return (
    <RegistrationContainer onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="Username" className="form-label">Username</label>
        <input
          type="username"
          className="form-control"
          id="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="Email"
          aria-describedby="emailHelp"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <a href="#" data-toggle="tooltip" title="We'll never share your email with anyone else.">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg>
        </a>
      </div>
      <label htmlFor="inputPassword5" className="form-label">Password</label>
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        aria-describedby="passwordHelpBlock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      <a href="#" data-toggle="tooltip" title="Your password must be 6-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
        </svg>
      </a>
      <div className="mb-3">
        <label htmlFor="Firstname" className="form-label">First name</label>
        <input
          type="username"
          className="form-control"
          id="Firstname"
          placeholder="Jane"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Lastname" className="form-label">Last name</label>
        <input
          type="username" 
          className="form-control" 
          id="Lastname" 
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="City" className="form-label">Phonenumber</label>
        <input
          type="city" 
          className="form-control"
          id="Phonenumber"
          placeholder="+01-23-456-7890"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="genderselect" className="form-label">Gender</label>
        <select
          className="form-select" 
          aria-label="Gender select" 
          id="genderselect"
          value={gender}
          onChange={(e) => setGender(e.target.value)}>
          {gender ? null : <option value="">Select gender!</option>}
          <option key={`Male`} value="Male">Male</option>
          <option key={`Female`} value="Female">Female</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="Zipcode" className="form-label">Zipcode</label>
        <input
          type="zipcode"
          className="form-control" 
          id="Zipcode" 
          placeholder="1234"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="City" className="form-label">City</label>
        <input
          type="city" 
          className="form-control"
          id="City"
          placeholder="New York"
          value={city}
          onChange={(e) => setCity(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Address" className="form-label">Street</label>
        <input
          type="address"
          className="form-control"
          id="Address"
          placeholder="Main Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Housenumber" className="form-label">House number</label>
        <input
          type="housenumber"
          className="form-control"
          id="Housenumber"
          placeholder="6"
          value={doorNumber}
          onChange={(e) => setDoorNumber(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Usertype" className="form-label">User type</label>
        <select
          className="form-select"
          aria-label="User type"
          id="Usertype"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}>
          {userType ? null : <option value="">Select user type!</option>}
          <option key={`CEO`} value="CEO">CEO</option>
          <option key={`Manager`} value="Manager">Manager</option>
          <option key={`Supervisor`} value="Supervisor">Supervisor</option>
          <option key={`Worker`} value="Worker">Worker</option>
          <option key={`Client`} value="Client">Client</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="compType" className="form-label">Name of the company</label>
        <select value={companyNameByDatabase} 
          onChange={(e) => setCompanyNameByDatabase(e.target.value)}
          name="compType"
          id="compType"
          className="form-select">
         {companyNameByDatabase ? null : <option value="">Select company!</option>}
         <option value="Not added yet">Not added yet</option>
         {companies &&
           companies.map((company) => (
             <option key={company.companyName} value={company.companyName}>
               {company.companyName}
             </option>
           ))}
       </select>
      </div>
      <div className="mb-3">
        <label htmlFor="compType" className="form-label">Registration type</label>
        <select
          value={registrationType}
          onChange={(e) => setRegistrationType(e.target.value)}
          name="regType"
          id="regType"
          className="form-select">
          {registrationType ? null : <option value="">Select registration type!</option>}
          <option key={`Company`} value="Company">Company</option>
          <option key={`PrivatePerson`} value="PrivatePerson">Private person</option>
          <option key={`CompanyEmployee`} value="CompanyEmployee">Company employee</option>
          <option key={`External`} value="External">External</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </RegistrationContainer>
  );
};

export default UserForm;
