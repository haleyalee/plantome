import React from 'react';

// import styles
import '../styles/SignUp.css';

function SignUp():JSX.Element {
  return (
    <div className="container py-5">
      
      <div className="d-flex flex-column justify-content-center align-content-center">
        <h2 className="mx-auto pb-3">Sign Up</h2>
        <form className="w-50 mx-auto">
          <div className="row g-3">
            <div className="col-lg-6">
              <label htmlFor="first-name" className="form-label">First Name</label>
              <input type="text" id="first-name" className="form-control" placeholder="First Name" required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="last-name" className="form-label">Last Name</label>
              <input type="text" id="last-name" className="form-control" placeholder="Last Name" required />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-control" placeholder="Email Address" required />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-6">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="text" id="password" className="form-control" placeholder="Password" required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
              <input type="text" id="confirm-password" className="form-control" placeholder="Confirm Password" />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <input type="submit" id="submit" value="Register" className="form-control btn btn-primary" />
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
