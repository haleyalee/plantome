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

  // Plants Context
  const {setPlants} = useContext(AppContext);

  useEffect(() => {
    fetch('https://szhy1liq97.execute-api.us-east-2.amazonaws.com/Prod/plants')
    .then( response => response.json())
    .then( plnts => setPlants(plnts))
    .catch( error => console.log(error));
  }, []);

  // Cart Context
  const {cart, setCart} = useContext(CartContext);

  useEffect(() => {
    fetch('')
    .then( response => response.json() )
    .then( cart => setCart(cart))
    .catch( error => console.log(error));
  }, []);
  
  // User Authentication
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = (state:boolean) => {
    setSignedIn(state);
    setIsAdmin(false);
  }

  useEffect(() => {
    Auth.currentSession()
    .then(() => setSignedIn(true))
    .catch((error) => console.log(`No current session: ${error}`))
  });
  
  // User Authorization
  const {isAdmin, setIsAdmin} = useContext(AdminContext);
  
  useEffect(()=> {
    Auth.currentAuthenticatedUser()
    .then((user) => { 
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      if (groups && groups.includes('admin')) {
        setIsAdmin(true);
      }
    })
    .catch((error) => console.log(`Error: ${error}`))
  }, [signedIn]);

  // Shopping Cart
  // const [cart, setCart] = useState<Plant[]>([]);

  const emptyCart = () => {
    setCart([]);
  }

  const handleAddToCart = (item:Plant) => {
    // if item is already in cart, increase quantity
    if (cart.includes(item)) {
      item.quantity += 1;
      console.log(item)
    } 
    // else add item to cart, set quantity to 1
    else {
      item.quantity = 1;
      setCart((currentCart:Plant[]) => [...currentCart, item]);
    }
    console.log(cart);
  };

  const handleRemoveFromCart = (item:Plant) => {
    item.quantity = 0;
    setCart((currentCart) => currentCart.filter((cartItem) => cartItem.id !== item.id));
  }

  const [stripePromise] = useState(() => loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'));

  // Search
  const [searchResult, setSearchResult] = useState<Plant[]>([]);

  const searchPlants = (results:Plant[]) => {
    setSearchResult(results);
  }

  // Checkout
  const [placedOrder, setPlacedOrder] = useState(false);
  const [checkOutCart, setCheckoutCart] = useState<Plant[]>([]);
  const handlePlacedOrder = () => {
    setPlacedOrder(true);
    setCheckoutCart(cart);
  }

  return (
    <div>
      <Router >
        <Nav cart={cart} signedIn={signedIn} handleSignIn={handleSignIn} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} search={searchPlants} />
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
              ? <Account handleSignIn={handleSignIn} cart={checkOutCart} /> 
              : <SignIn handleSignIn={handleSignIn} /> 
            }
          </Route>
          <Route exact path="/admin/add-plant">{ (isAdmin) ? <AddPlant /> : <NotFound /> }</Route>
          <Route exact path="/admin/edit-plant/:id"><EditPlant /></Route>
          <Route exact path="/admin"><Admin /></Route>

          <Route exact path ="/checkout/order-confirmation">
            { (placedOrder) ? <OrderConfirmation cart={checkOutCart} signedIn={signedIn} /> : <Home addToCart={handleAddToCart} /> }
          </Route>
          <Route path="/checkout">
            <Elements stripe={stripePromise}>
              <Checkout cart={cart} emptyCart={emptyCart} signedIn={signedIn} handleSignIn={handleSignIn} handlePlacedOrder={handlePlacedOrder}/>
            </Elements>
          </Route>

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
