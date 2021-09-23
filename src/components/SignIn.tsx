import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import '../styles/SignUp.css'

// eslint-disable-next-line
function SignIn(props:any):JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signedIn, setSignedIn] = useState(false);
  // const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');

  const signIn = () => {
    Auth.signIn({
      username: email,
      password: password
    })
    .then( () => {
      console.log("Successfully signed in"); 
      setSignedIn(true);
      props.handleSignIn(true); 
      props.history.push('/plants');
    })
    .catch((error) => {
      console.log(`Error signing in: ${error.message}`)
      setError(error.message);
    })
  }

  const switchToForgotPassword = () => {
    props.history.push('/signin/forgotpassword');
  }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    signIn();
    setError('');
  }

  const switchToSignUp = () => {
    props.history.push('/signup');
  }

  return (
    <div className="container py-5">
      
      { (signedIn) 
      ?
      <div><em>You have successfully signed in.</em></div>
      :
      <div className="d-flex flex-column justify-content-center align-content-center">
        <h2 className="mx-auto pb-3">Sign In</h2>
        <form id="signInForm" className="mx-auto" onSubmit={handleSubmit} >
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
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <label htmlFor="password" className="form-label">Password</label>
                <a role="button" onClick={switchToForgotPassword}><small><u>Forgot password?</u></small></a>
              </div>
              <input 
                type="password" 
                id="password" 
                className="form-control" 
                placeholder="Password" 
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <button type="submit" id="submit" className="form-control btn btn-success">Sign In</button>
            </div>
          </div>
          { error ? <div className="row g-3 mt-1 text-danger">❌ {error}</div> : <div></div> }
        </form>
        <div className="mx-auto py-3">
          <p>Don&apos;t have an account? <a role="button" onClick={switchToSignUp}><strong><u>Sign Up</u></strong></a></p>
        </div>
      </div>
    }
    </div>

  )
}

export default withRouter(SignIn);
