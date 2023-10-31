import { useState, useEffect } from "react";
import Loading from "../Loading";

const EmployeeForm = ({ onSave, disabled, user, onCancel }) => {

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(user?.userName ?? "");
  const [password, setPassword] = useState(user?.password ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [address, setAddress] = useState(user?.address ?? "");
  const [userType, setUserType] = useState(user?.userType ?? "");
  const [registrationType, setRegistrationType] = useState(user?.registrationType ?? "");

  //submit function
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
        address,
        userType,
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
        address,
        userType,
        registrationType
    });
  };

  if (loading) {
    return <Loading />;
  }

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
        <input
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          id="gender"
        />
      </div>
      <div className="control">
        <label htmlFor="address">Address:</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          id="address"
        />
      </div>

      <div className="control">
        <label htmlFor="userType">User type:</label>
        <input
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          name="userType"
          id="userType"
        />
      </div>

      <div className="control">
        <label htmlFor="regType">Registration type:</label>
        <input
          value={registrationType}
          onChange={(e) => setRegistrationType(e.target.value)}
          name="regType"
          id="regType"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {user ? "Update User" : "Create User"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
