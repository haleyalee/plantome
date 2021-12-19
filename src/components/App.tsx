import React, {useState, useEffect, useContext} from  'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Auth } from 'aws-amplify';
Amplify.configure(aws_exports);

// import external stylesheets
import '../styles/App.css';
import '../styles/scss/custom.css';

// import contexts and entities
import AppContext, { AdminContext, CartContext } from '../contexts';
import Plant from '../entities/plant';
import Cart from '../entities/cart';

// import components
import Nav from './Nav';
import Home from './Home';
import AllPlants from './plants/AllPlants';
import FilteredPlants from './plants/FilteredPlants';
import SearchPlants from './plants/SearchPlants';
import About from './About';
import Contact from './Contact';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import Account from './Account';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import AddPlant from './AddPlant';
import NotFound from './NotFound';
import EditPlant from './EditPlant';
import Admin from './account/Admin';
import Footer from './Footer';

// eslint-disable-next-line
function App(props:any):JSX.Element {

  // User Authentication
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState();

  const handleSignIn = (state:boolean) => {
    setSignedIn(state);
    setIsAdmin(false);
  }

  useEffect(() => {
    Auth.currentSession()
    .then(() => setSignedIn(true))
    .catch((error) => console.log(`No current session: ${error}`))
  }, []);
  
  // User Authorization
  const {isAdmin, setIsAdmin} = useContext(AdminContext);
  
  useEffect(()=> {
    Auth.currentAuthenticatedUser()
    .then((user) => { 
      setUser(user.username);
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      if (groups && groups.includes('Admin')) {
        setIsAdmin(true);
      }
    })
    .catch((error) => console.log(`Error: ${error}`))
  }, [signedIn]);

  // Plants Context
  const {setPlants} = useContext(AppContext);

  useEffect(() => {
    fetch('https://ui3lck4yg1.execute-api.us-east-2.amazonaws.com/Prod/plants')
    .then( response => response.json())
    .then( plnts => setPlants(plnts))
    .catch( error => console.log(error))
  }, []);

  // Cart Context
  const {cart, setCart} = useContext(CartContext);
  const [orderHistory, setOrderHistory] = useState<(Plant[])[]>([]);

  // Read cart from database if signed in
  useEffect(() => {
    if (signedIn && user) {
      fetch(`https://ui3lck4yg1.execute-api.us-east-2.amazonaws.com/Prod/cart/${user}`)
      .then( response => response.json())
      .then( userCart => {
        setCart(userCart.cart);
        setOrderHistory(userCart.orderHistory);
        console.log("Successfully read cart");
      })
      .catch( error => console.log(`Failed to read cart: ${error}`))
    }
  }, [signedIn, user]);

  // Update cart in database when changed
  useEffect(() => {
    if (signedIn && user) {
      const userCart = new Cart(user, cart, orderHistory);
      fetch('https://ui3lck4yg1.execute-api.us-east-2.amazonaws.com/Prod/cart', {
        method: 'POST',
        body: JSON.stringify(userCart),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(() => console.log("Successfully updated cart"))
      .catch(error => console.log(`Failed to update cart: ${error}`))
    }
  }, [cart, orderHistory, setCart, setOrderHistory]);

  const emptyCart = () => {
    setCart([]);
  }

  const handleAddToCart = (item:Plant, qty:number) => {
    // if item is already in cart, increase quantity
    if (cart.includes(item)) {
      item.quantity = qty;
      const idxItem = cart.findIndex((itm) => itm.id === item.id);
      const newCart = [...cart.slice(0,idxItem), item, ...cart.slice(idxItem+1)]
      setCart(newCart);
    } 
    // else add item to cart, set quantity to 1
    else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (item:Plant) => {
    item.quantity = 0;
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  }

  const [stripePromise] = useState(() => loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'));

  // Search
  const [searchResult, setSearchResult] = useState<Plant[]>([]);

  const searchPlants = (results:Plant[]) => {
    setSearchResult(results);
  }

  // Checkout
  const [placedOrder, setPlacedOrder] = useState(false);
  // const [orderHistory, setOrderHistory] = useState<Plant[]>([]);
  const handlePlacedOrder = () => {
    setPlacedOrder(true);
    setOrderHistory([cart, ...orderHistory]);
  }

  return (
    <div>
      <Router >
        <Nav signedIn={signedIn} handleSignIn={handleSignIn} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} search={searchPlants} />
        <Switch>
          <Route exact path="/"><Home addToCart={handleAddToCart}/></Route>
          <Route exact path="/plants/search"><SearchPlants search={searchPlants} searchResult={searchResult} addToCart={handleAddToCart} /></Route>
          
          <Route exact path="/plants/best-seller"><FilteredPlants pageName={"Best Seller"} addToCart={handleAddToCart} /></Route>
          <Route exact path="/plants/beginner"><FilteredPlants pageName={"Beginner"} addToCart={handleAddToCart} /></Route>
          <Route exact path="/plants/low-maintenance"><FilteredPlants pageName={"Low Maintenance"} addToCart={handleAddToCart} /></Route>
          <Route exact path="/plants/tropical"><FilteredPlants pageName={"Tropical"} addToCart={handleAddToCart} /></Route>
          <Route path="/plants"><AllPlants addToCart={handleAddToCart}/></Route>
          
          <Route path="/about"><About /></Route>
          <Route path="/contact"><Contact /></Route>

          <Route path="/signup"><SignUp handleSignIn={handleSignIn} /></Route>
          <Route exact path="/signin/forgotpassword"><ForgotPassword /></Route>
          <Route path="/signin"><SignIn handleSignIn={handleSignIn}/></Route>

          <Route path="/account">
            { (signedIn) 
              ? <Account handleSignIn={handleSignIn} orderHistory={orderHistory} /> 
              : <SignIn handleSignIn={handleSignIn} /> 
            }
          </Route>
          <Route exact path="/admin/add-plant">{ (isAdmin) ? <AddPlant /> : <NotFound /> }</Route>
          <Route exact path="/admin/edit-plant/:id"><EditPlant /></Route>
          <Route exact path="/admin"><Admin /></Route>

          <Route exact path ="/checkout/order-confirmation">
            { (placedOrder) ? <OrderConfirmation orderHistory={orderHistory} signedIn={signedIn} /> : <Home addToCart={handleAddToCart} /> }
          </Route>
          <Route path="/checkout">
            <Elements stripe={stripePromise}>
              <Checkout emptyCart={emptyCart} signedIn={signedIn} handleSignIn={handleSignIn} handlePlacedOrder={handlePlacedOrder}/>
            </Elements>
          </Route>

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
