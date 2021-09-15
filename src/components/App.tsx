import React, {useState} from  'react';
// import { useQuery } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// import external stylesheets
import '../styles/App.css';

import Plant from '../entities/plant';

// import components
import Nav from './Nav';
import Home from './Home';
import AllPlants from './plants/AllPlants';
import FilteredPlants from './plants/FilteredPlants';
import About from './About';
import Contact from './Contact';
// import Drawer from '@material-ui/core/Drawer';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Grid from '@material-ui/core/Grid';
// import Badge from '@material-ui/core/Badge';
// import PlantContextProvider from '../contexts/PlantContextProvider';


export type CartItemType = {
  id: number,
  name: string,
  price: number,
  category: string,
  quantity: number,
  image: string
}

function App():JSX.Element {

  // const getTotalItems = (items:CartItemType[]) => 
  //  items.reduct((ack: number, item) => ack + item.amount, 0);

  // if ( isLoading ) return <LinearProgress />;
  // if ( error ) return <div>Something went wrong... </div>

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

  

  return (
    <div>
      <Router >
        <Nav cart={cart} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
        <Switch>
          <Route exact path="/"><Home addToCart={handleAddToCart}/></Route>
          <Route exact path="/plants/best-seller"><FilteredPlants pageName={"Best Seller"} addToCart={handleAddToCart} /></Route>
          <Route exact path="/plants/beginner"><FilteredPlants pageName={"Beginner"} addToCart={handleAddToCart} /></Route>
          <Route exact path="/plants/low-maintenance"><FilteredPlants pageName={"Low Maintenance"} addToCart={handleAddToCart} /></Route>
          <Route exact path="/plants/tropical"><FilteredPlants pageName={"Tropical"} addToCart={handleAddToCart} /></Route>
          <Route path="/plants"><AllPlants addToCart={handleAddToCart}/></Route>
          <Route path="/about"><About /></Route>
          <Route path="/contact"><Contact /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
