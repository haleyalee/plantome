import React, {useState, useEffect} from  'react';
// import { useQuery } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Auth } from 'aws-amplify';
Amplify.configure(aws_exports);

// import external stylesheets
import '../styles/App.css';

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


export type CartItemType = {
  id: number,
  name: string,
  price: number,
  category: string,
  quantity: number,
  image: string
}

function App():JSX.Element {
  
  // User Authentication
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = (state:boolean) => {
    setSignedIn(state);
  }

  useEffect(() => {
    Auth.currentSession()
    .then((res) => {
      console.log(res);
      setSignedIn(true);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    })
  });
  
  // Shopping Cart
  const [cart, setCart] = useState<Plant[]>([]);

  const handleAddToCart = (item:Plant) => {
    // if item is already in cart, increase quantity
    if (cart.includes(item)) {
      item.quantity += 1;
      console.log(item)
    } 
    // else add item to cart, set quantity to 1
    else {
      item.quantity = 1;
      setCart((currentCart) => [...currentCart, item]);
    }
    console.log(cart);
  };

  const handleRemoveFromCart = (item:Plant) => {
    // set item quantity to 0
    item.quantity = 0;
    
    // remove item from cart
    setCart((currentCart) => {
      const idxItem = currentCart.findIndex((cartItem) => cartItem.id === item.id);

      if (idxItem === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, idxItem),
        ...currentCart.slice(idxItem + 1),
      ];
    });
    console.log(cart)
  }

  // Search
  const [searchResult, setSearchResult] = useState<Plant[]>([]);

  const searchPlants = (results:Plant[]) => {
    setSearchResult(results);
  }

  return (
    <div>
      <Router >
        <Nav cart={cart} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} search={searchPlants} />
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
          <Route path="/account">{ (signedIn) ? <Account handleSignIn={handleSignIn} /> : <SignIn handleSignIn={handleSignIn} /> }</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
