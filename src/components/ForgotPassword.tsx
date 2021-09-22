import React, { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

function ForgotPassword():JSX.Element {

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [confirmationCode, setConfirmationCode] = useState('');
  const [verified, setVerified] = useState(false);

  // form validation
  useEffect(() => {
    const form = document.getElementById("resetPasswordForm") as HTMLSelectElement;
    form?.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  });

  const forgotPassword = () => {
    console.log(email);
    Auth.forgotPassword(email)
    .then( () => console.log("Successfully sent confirmation code to change password") )
    .catch( (error) => console.log(`Error changing password: ${error}`) )
  }

  const forgotPasswordSubmit = () => {
    Auth.forgotPasswordSubmit(email, confirmationCode, newPassword)
    .then( () => console.log("Successfully changed password"))
    .catch( (error) => console.log(`Error changing password: ${error}`))
  }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    if (verified) {
      forgotPasswordSubmit();
      setConfirmationCode('');
      setNewPassword('');
    } else {
      setVerified(true);
      forgotPassword();
    }
  }

  return (
    <div className="container py-5">
      
        { verified 
          ?
          // Reset Password Form
          <div className="d-flex flex-column justify-content-center align-content-center">
            <h2 className="mx-auto pb-3">Reset Password</h2>
            <form id="resetPasswordForm" className="w-50 mx-auto needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="confirmation" className="form-label ">Confirmation Code</label>
                  <input 
                    id="confirmation" 
                    className="form-control"
                    type="text" 
                    placeholder="Confirmation Code" 
                    pattern="[0-9]{6}"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please provide a 6-digit confirmation code.
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="newPassword" className="form-label ">New Password</label>
                  <input 
                    id="newPassword" 
                    className="form-control mb-3"
                    type="password" 
                    placeholder="Confirmation Code" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    A valid password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters.
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <input type="submit" className="form-control btn btn-success" value="Reset Password" />
                </div>
              </div>
            </form>
            <div className="mx-auto py-3">
              <p>Didn&apos;t receive email? <a role="button" onClick={forgotPassword}><strong><u>Resend code</u></strong>.</a></p>
            </div>
          </div>
          :
          <div className="d-flex flex-column justify-content-center align-content-center">
            <h2 className="mx-auto pb-3">Forgot Password?</h2>
            <form id="forgotPasswordForm" className="w-50 mx-auto" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Please enter the email associated with your account</label>
                  <input 
                    id="email" 
                    className="form-control" 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                  />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <input className="form-control btn btn-success" type="submit" value="Reset Password"/>
                </div>
              </div>
            </form>
          </div>
        }
      </div>
  )
}

export default ForgotPassword;
