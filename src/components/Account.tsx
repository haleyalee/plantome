import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// import styles
import "../styles/Account.css";

// eslint-disable-next-line
function Account(props:any) {

  const [userProfile, setUserProfile] = useState(true);
  const [orderHistory, setOrderHistory] = useState(false);

  const switchView = (page:string) => {
    switch (page) {
      case "user-profile":
        setUserProfile(true);
        setOrderHistory(false);
        break;
      case "order-history":
        setUserProfile(false);
        setOrderHistory(true);
        break;
      default:
        setUserProfile(false);
        setOrderHistory(false);
        break;
    }
  }

  const signOut = () => {
    Auth.signOut();
    props.handleSignIn(false);
  }

  return (
    <div className="container py-5">
      
      <div className="row pt-0">
        
        <div id="account-menu" className="col-3">
          <h3 className="pb-4">My Account</h3>
          <div id="user-profile-opt" className="mx-auto pb-4" role="button" onClick={() => switchView('user-profile')}>
            <h5>User Profile Settings</h5>
          </div>
          <div id="order-history-opt" className="mx-auto pb-4" role="button" onClick={() => switchView('order-history')}>
            <h5>Order History</h5>
          </div>
          <div id="log-out-opt" className="mx-auto pb-4" role="button" onClick={signOut}>
            <h5>Sign Out</h5>
          </div>
        </div>
        <div className="col-9">
          {/* User Profile Settings */}
          { (userProfile && !orderHistory)
          ?
          <div id="user-profile">
            <h3 className="pb-4">User Profile Settings</h3>
            <div>
              <button className="btn btn-outline-danger">Permanently Delete My Account</button>
            </div>
          </div>
          :
          <div></div>
          }
          {/* Order History */}
          { (orderHistory && !userProfile)
          ?
          <div id="order-history">
            <h3 className="pb-4">Order History</h3>
          </div>
          :
          <div></div>
          }

        </div>
      </div>
    </div>
  )
}

export default withRouter(Account);
