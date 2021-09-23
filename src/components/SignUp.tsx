import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

// import styles
import '../styles/SignUp.css';

// eslint-disable-next-line
function SignUp(props:any):JSX.Element {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');


  // form validation
  useEffect(() => {
    const form = document.getElementById("signUpForm") as HTMLSelectElement;
    form?.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  });

  const signUp = () => {
    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        given_name: fname,
        family_name: lname
      }
    })
    .then(() => {
      console.log("Sucessfully signed up!");
      setIsConfirming(true);
    })
    .catch((error) => {
      console.log(`Error signing up: ${error.message}`)
      setError(error.message);
    })
  }

  const confirmSignUp = () => {
    Auth.confirmSignUp(email, confirmationCode)
    .then(() => {
      console.log("Successfully confirmed sign up!");
      Auth.signIn(email, password);
      props.handleSignIn(true);
      props.history.push('/plants');
    })
    .catch((error) => {
      console.log(`Error confirming sign up: ${error.message}`)
      setError(error.message);
    })
  }

  const resendSignUp = () => {
    Auth.resendSignUp(email)
    .then( () => {
      console.log("Successfully resent the confirmation code");
    })
    .catch((error) => {
      console.log(`Error resending confirmation code: ${error.message}`)
      setError(error.message);
    })
  }

  const handleSubmit = (form:string, e:React.SyntheticEvent) => {
    e.preventDefault();
    
    if (verified && form === "confirmationForm") {
      confirmSignUp();
      setConfirmationCode('');
    } else if (form === "signUpForm") {
      signUp();
      setVerified(true);
      setError('');
    }
    // e.target.reset();
  }

  const switchToSignIn = () => {
    props.history.push('/signin');
  }

  return (
    <div className="container py-5">

      { (verified && isConfirming) 
        ?
        // Confirmation Form
        <div className="d-flex flex-column justify-content-center align-content-center">
          <h2 className="mx-auto pb-3"></h2>
          <form id="confirmationForm" className="w-50 mx-auto d-flex flex-column" onSubmit={(e) => handleSubmit("confirmationForm", e)}>
            <label htmlFor="confirmation" className="form-label ">Confirmation Code</label>
            <input 
              id="confirmation" 
              className="form-control mb-3"
              type="text" 
              placeholder="Confirmation Code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <input type="submit" className="btn btn-success" value="Confirm Sign Up" />
            { error ? <div className="row g-3 mt-1 text-danger">❌ {error}</div> : <div></div> }
          </form>
          <div className="mx-auto py-3">
            <p>Didn&apos;t receive email? <a role="button" onClick={resendSignUp}><strong><u>Resend code</u></strong>.</a></p>
          </div>
        </div>
        :
        // Sign Up Form
        <div className="d-flex flex-column justify-content-center align-content-center">
          <h2 className="m-auto pb-3">Sign Up</h2>
          <form id="signUpForm" className="w-50 mx-auto needs-validation" noValidate onSubmit={(e) => handleSubmit("signUpForm", e)} >
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
            { error ? <div className="row g-3 mt-1 text-danger">❌ {error}</div> : <div></div> }
          </form>
          <div className="mx-auto py-3">
            <p>Already have an account? <a role="button" onClick={switchToSignIn}><strong><u>Sign In</u></strong></a></p>
          </div>
        </div>
      }
    </div>
  )
}

export default withRouter(SignUp);
