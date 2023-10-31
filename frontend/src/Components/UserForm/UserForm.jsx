import { useState, useEffect } from "react";
import Loading from "../Loading";

const EmployeeForm = ({ onSave, user, onCancel }) => {

  const [loading, setLoading] = useState(false);
  const [Username, setUserName] = useState(user?.Username ?? "");
  const [Password, setPassword] = useState(user?.Password ?? "");
  const [Email, setEmail] = useState(user?.Email ?? "");
  const [PhoneNumber, setPhoneNumber] = useState(user?.PhoneNumber ?? "");
  const [FirstName, setFirstName] = useState(user?.FirstName ?? "");
  const [LastName, setLastName] = useState(user?.LastName ?? "");
  const [Gender, setGender] = useState(user?.Gender ?? "");
  const [Address, setAddress] = useState(user?.Address ?? "");
  const [UserType, setUserType] = useState(user?.UserType ?? "");
  const [RegistrationType, setRegistrationType] = useState(user?.RegistrationType ?? "");

  //submit function
  const onSubmit = (e) => {
    e.preventDefault();

    if (user) {
      return onSave({
        ...user,
        Username,
        Password,
        Email,
        PhoneNumber,
        FirstName,
        LastName,
        Gender,
        Address,
        UserType,
        RegistrationType
      });
    }

    return onSave({
      Username,
      Password,
      Email,
      PhoneNumber,
      FirstName,
      LastName,
      Gender,
      Address,
      UserType,
      RegistrationType
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
          value={Username}
          onChange={(e) => setUserName(e.target.value)}
          name="userName"
          id="userName"
        />
      </div>

      <div className="control">
        <label htmlFor="password">Password:</label>
        <input
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
      </div>

      <div className="control">
        <label htmlFor="email">Email:</label>
        <input
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="phoneNumber">Phonenumber:</label>
        <input
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          name="phoneNumber"
          id="phoneNumber"
        />
      </div>

      <div className="control">
        <label htmlFor="firstName">First name:</label>
        <input
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          id="firstName"
        />
      </div>

      <div className="control">
        <label htmlFor="lastName">Last name:</label>
        <input
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          id="lastName"
        />
      </div>

      <div className="control">
        <label htmlFor="gender">Gender:</label>
        <input
          value={Gender}
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          id="gender"
        />
      </div>
      <div className="control">
        <label htmlFor="address">Address:</label>
        <input
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          id="address"
        />
      </div>

      <div className="control">
        <label htmlFor="userType">User type:</label>
        <input
          value={UserType}
          onChange={(e) => setUserType(e.target.value)}
          name="userType"
          id="userType"
        />
      </div>

      <div className="control">
        <label htmlFor="regType">Registration type:</label>
        <input
          value={RegistrationType}
          onChange={(e) => setRegistrationType(e.target.value)}
          name="regType"
          id="regType"
        />
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
