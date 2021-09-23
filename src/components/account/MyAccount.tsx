import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify';

type Props = {
  // eslint-disable-next-line
  user: any,
  fname: string,
  lname: string,
  email: string
}

function MyAccount(props:Props):JSX.Element {

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // form validation
  useEffect(() => {
    const form = document.getElementById("changePasswordForm") as HTMLSelectElement;
    form?.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  });

  const changePassword = () => {
    Auth.changePassword(props.user, oldPassword, password)
    .then(() => {
      console.log("Successfully changed password");
      setSuccess(true);
    })
    .catch((error) => {
      console.log(`Error changing password: ${error.message}`);
      setError(error.message);
    })
  };

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    changePassword();
  }

  return (
    <div>
      <h3 className="pb-4">My Account</h3>
      <div className="mb-4">
        <h5 className="mb-2">Account Details</h5>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <label className="me-3 mb-1"><strong>Email</strong></label>
            <label className="me-3 mb-1"><strong>Name</strong></label>
          </div>
          <div className="d-flex flex-column">
            <p className="mb-1">{props.email}</p>
            <p className="mb-1">{props.fname} {props.lname}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h5 className="mb-2">Change password</h5>
        <form id="changePasswordForm" className="form d-flex flex-column needs-validation" noValidate onSubmit={handleSubmit}>
          <input 
            type="password" 
            className="form-control form-control-sm mb-2" 
            placeholder="Current Password" 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="form-control form-control-sm mb-2" 
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            placeholder="New Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="invalid-feedback mb-2">
            A valid password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters.
          </div>
          <input 
            type="password" 
            className="form-control form-control-sm mb-2" 
            pattern={password} 
            placeholder="Confirm New Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="invalid-feedback mb-2">
            Please ensure passwords match.
          </div>
          <input type="submit" className="btn btn-sm btn-outline-secondary" value="Update" />
          { success ? <div className="text-success my-2">Password successfully changed.</div>  : <div></div> }
          { error ? <div className="row g-3 mt-1 text-danger">❌ {error}</div> : <div></div> }
        </form>
      </div>
      {/* <div>
        <button className="btn btn-outline-danger">Permanently Delete My Account</button>
      </div> */}
    </div>
  )
}

export default MyAccount
