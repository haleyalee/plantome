import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

// eslint-disable-next-line
function SignIn(props:any):JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signedIn, setSignedIn] = useState(false);

  const signIn = () => {
    Auth.signIn({
      username: email,
      password: password
    })
    .then( () => {
      console.log("Successfully signed in"); 
      props.handleSignIn(true); 
    })
    .catch( (error) => console.log(`Error signing in: ${error}`))
  }

  // const confirmSignIn = () => {
  //   Auth.confirmSignIn(email)
  //   .then( () => console.log("Successfully confirmed sign in") )
  //   .catch( (error)( ))
  // }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    signIn();
    setEmail('');
    setPassword('');
    setSignedIn(true);
    props.history.push('/plants');
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
        <form id="form" className="w-50 mx-auto" onSubmit={handleSubmit} >
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
          </div>
          <div className="row g-3">
            <div className="col-12">
              <button type="submit" id="submit" className="form-control btn btn-success">Sign In</button>
            </div>
          </div>
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
