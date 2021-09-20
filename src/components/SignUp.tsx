import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

// import styles
import '../styles/SignUp.css';

import User from '../entities/user';

type UserSignUpData = {
  fname: string,
  lname: string,
  email: string,
  password: string,
  confirmPassword: string
}

function SignUp():JSX.Element {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const [isValidForm, setIsValidForm] = useState(false);
  // const [isDirtyForm, setIsDirtyForm] = useState(false);

  // // Form validation
  // useEffect(() => {
  //   const fnameValid = fname ? true : false;
  //   const lnameValid = lname ? true : false;
  //   const emailValid = email ? true : false;
  //   const passwordValid = password ? true : false;
  //   const confirmPasswordValid = confirmPassword === password ? true : false;

  //   const isValid = fnameValid && lnameValid && emailValid && passwordValid && confirmPasswordValid;
  //   const isDirty = fnameValid || lnameValid || emailValid || passwordValid || confirmPasswordValid;

  //   setIsValidForm(isValid);
  //   setIsDirtyForm(isDirty);
  // }, [fname, lname, email, password, confirmPassword, setIsValidForm, setIsDirtyForm]);

  // // form validation
  // useEffect(() => {
  //   const form = document.getElementById("form") as HTMLSelectElement;
  //   form?.addEventListener('submit', function (event) {
  //     if (!form.checkValidity()) {
  //       event.preventDefault()
  //       event.stopPropagation()
  //     }

  //     form.classList.add('was-validated')
  //   }, false)
  // });

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const user = new User(
      0,
      fname,
      lname,
      email,
      password
    )
    console.log(user);
  };

  return (
    <div className="container py-5">
      
      <div className="d-flex flex-column justify-content-center align-content-center">
        <h2 className="mx-auto pb-3">Sign Up</h2>
        <form id="form" className="w-50 mx-auto needs-validation" noValidate onSubmit={handleSubmit} >
          <div className="row g-3">
            <div className="col-lg-6">
              <label htmlFor="fname" className="form-label">First Name</label>
              <input 
                type="text" 
                id="fname" 
                className="form-control" 
                placeholder="First Name" 
                pattern="[A-Za-z]{1,32}"
                value={fname} 
                onChange={(e)=>setFname(e.target.value)} 
                required 
              />
              <div className="invalid-feedback">
                Please provide a valid first name.
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="lname" className="form-label">Last Name</label>
              <input 
                type="text" 
                id="lname" 
                className="form-control" 
                placeholder="Last Name" 
                pattern="[A-Za-z]{1,32}"
                value={lname} 
                onChange={(e)=>setLname(e.target.value)} 
                required 
              />
              <div className="invalid-feedback">
                Please provide a valid last name.
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-control" 
                placeholder="Email Address"
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                required 
              />
              <div className="invalid-feedback">
                Please provide a valid email address.
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-6">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-control" 
                placeholder="Password" 
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                required 
              />
              <div className="invalid-feedback">
                A valid password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters.
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                className="form-control" 
                placeholder="Confirm Password" 
                pattern={password}
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)} 
                required
              />
              <div className="invalid-feedback">
                Please ensure passwords match.
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <button type="submit" id="submit" className="form-control btn btn-success">Register</button>
            </div>
          </div>
        </form>
        <div className="mx-auto py-3">
          <p>Already have an account? <a href=""><strong>Login Now</strong></a></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
