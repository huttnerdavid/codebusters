import { useState } from "react";

const EmployeeForm = ({ onSave, user, onCancel, companies }) => {

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
    <form className="EmployeeForm" onSubmit={onSubmit}>
      
      <div className="control">
        <label htmlFor="userName">Username:</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          name="userName"
          id="userName"
        />
      </div>

      <div className="control">
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
      </div>

      <div className="control">
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="phoneNumber">Phonenumber:</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          name="phoneNumber"
          id="phoneNumber"
        />
      </div>

      <div className="control">
        <label htmlFor="firstName">First name:</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          id="firstName"
        />
      </div>

      <div className="control">
        <label htmlFor="lastName">Last name:</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          id="lastName"
        />
      </div>

      <div className="control">
        <label htmlFor="gender">Gender:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          id="gender"
        >
          {gender ? null : <option value="">Select gender!</option>}
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
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
        <label htmlFor="userType">User type:</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          name="userType"
          id="userType"
        >
          {userType ? null : <option value="">Select user type!</option>}
          <option value="CEO">CEO</option>
          <option value="Manager">Manager</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Worker">Worker</option>
          <option value="Client">Client</option>
        </select>
      </div>

      <div className="control">
        <label htmlFor="compType">Name of the company:</label>
        <select
          value={companyNameByDatabase}
          onChange={(e) => setCompanyNameByDatabase(e.target.value)}
          name="compType"
          id="compType"
        >
          {companyNameByDatabase ? null : <option value="">Select company!</option>}
          <option value="Not added yet">Not added yet</option>
          {companies &&
            companies.map((company) => (
              <option key={company.company} value={company.companyName}>
                {company.companyName}
              </option>
            ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="regType">Registration type:</label>
        <select
          value={registrationType}
          onChange={(e) => setRegistrationType(e.target.value)}
          name="regType"
          id="regType"
        >
          {registrationType ? null : <option value="">Select registration type!</option>}
          <option value="Company">Company</option>
          <option value="PrivatePerson">Private person</option>
          <option value="CompanyEmployee">Company employee</option>
          <option value="External">External</option>
        </select>
      </div>

      <div className="buttons">
        <button type="submit">
          {user ? "Update User" : "Create User"}
        </button>
        <button type="button" onClick = { onCancel }>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
