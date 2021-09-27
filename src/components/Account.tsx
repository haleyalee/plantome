import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

// import styles
import "../styles/Account.css";

// import components
import MyAccount from "./account/MyAccount";
import ReviewOrder from './ReviewOrder';

// eslint-disable-next-line
function Account(props:any) {

  const [myAccount, setMyAccount] = useState(true);
  const [orderHistory, setOrderHistory] = useState(false);

  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    Auth.currentUserPoolUser()
    .then((res) => {
      setUser(res);
      setEmail(res.attributes.email);
      setFname(res.attributes.given_name);
      setLname(res.attributes.family_name);
    })
    .catch((error) => {
      console.log(`No current user: ${error}`);
    })
  }, [setUser, setEmail, setFname, setLname]);

  const switchView = (page:string) => {
    switch (page) {
      case "my-account":
        setMyAccount(true);
        setOrderHistory(false);
        break;
      case "order-history":
        setMyAccount(false);
        setOrderHistory(true);
        break;
      default:
        setMyAccount(false);
        setOrderHistory(false);
        break;
    }
  }

  const signOut = () => {
    Auth.signOut()
    .then(() => {
      console.log("Successfully signed out");
      props.history.push('/signin');
      props.handleSignIn(false);
    })
    .catch((error) => console.log(`Error signing out: ${error.message}`))
  }

  return (
    <div className="container pb-5">
      
      <div className="row pt-0">
        
        <div id="account-menu" className="col-xs-12 col-md-4 col-lg-3 bg-light py-4">
          <h3 className="pb-4">Hello, {fname} 🌱</h3>
          <div id="my-account-opt" className="menu-opt" role="button" onClick={() => switchView('my-account')}>
            <h5>My Account</h5>
          </div>
          <div id="order-history-opt" className="menu-opt" role="button" onClick={() => switchView('order-history')}>
            <h5>Order History</h5>
          </div>
          <div id="log-out-opt" className="menu-opt" role="button" onClick={signOut}>
            <h5>Sign Out</h5>
          </div>
        </div>
        <div id="account-view" className="col-xs-12 col-md-8 col-lg-9 pt-5">
          {/* User Profile Settings */}
          { (myAccount && !orderHistory)
          ?
          <div id="my-account"><MyAccount  user={user} fname={fname} lname={lname} email={email} /></div>
          :
          <div></div>
          }
          {/* Order History */}
          { (orderHistory && !myAccount)
          ?
          <div id="order-history">
            <h3 className="pb-4">Order History</h3>
            { (props.cart.length === 0) ? <div></div> : <ReviewOrder cart={props.cart} />  }
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
