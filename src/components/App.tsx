import React from  'react';
// import { useQuery } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// import external stylesheets
import '../styles/App.css';

// import components
import Nav from './Nav';
import Home from './Home';
import AllPlants from './plants/AllPlants';
import About from './About';
import Contact from './Contact';
// import Drawer from '@material-ui/core/Drawer';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Grid from '@material-ui/core/Grid';
// import Badge from '@material-ui/core/Badge';

export type CartItemType = {
  id: number,
  name: string,
  price: number,
  category: string,
  quantity: number,
  image: string
}

export const data = [
	{ id: 0, name: 'Monstera', 
    price: 19.00, 
    category: ['Tropical', 'Best Seller'], 
    quantity: 20, 
    image: "https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w" 
  }, { 
    id: 1, 
    name: 'Croton', 
    price: 18.00, 
    category: ['Tropical', 'Best Seller', 'Beginner'], 
    quantity: 20, 
    image: "https://www.jacksonandperkins.com/images/xxl/v2435.jpg"
  }, { 
    id: 2, 
    name: 'Lemon Lime Dracaena', 
    price: 15.00, 
    category: ['Tropical', 'Best Seller', 'Beginner'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0260/3037/4957/products/large-plant-lemon-lime-dracaena-seafoam-pot.jpg?v=1623332685" 
  }, { 
    id: 3, 
    name: 'Golden Pothos', 
    price: 15.00, 
    category: ['Best Seller', 'Beginner', 'Low Maintenance'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0252/3928/9903/products/golden-pothos-589505_900x.jpg?v=1606341920" 
  }, { 
    id: 4, 
    name: 'Dracaena Marginata', 
    price: 15.00, 
    category: ['Best Seller', 'Tropical'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/2528/3612/products/Dracaena_Marginata_Cane_tappered_700x700.jpg?v=1605810638"
  }, { 
    id: 5, 
    name: 'Snake Plant', 
    price: 15.00, 
    category: ['Best Seller', 'Beginner', 'Low Maintenance'], 
    quantity: 20, 
    image: "https://www.thespruce.com/thmb/_6OfTexQcyd-3aW8Z1O2y78sc-Q=/2048x1545/filters:fill(auto,1)/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg"
  }, { 
    id: 6, 
    name: 'Peace Lily', 
    price: 15.00, 
    category: ['Best Seller'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0212/1030/0480/products/peace-lily-plant.jpg?v=1612898818"
  }, { 
    id: 7, 
    name: 'Majesty Palm', 
    price: 20.00, 
    category: ['Best Seller', 'Tropical'], 
    quantity: 20, 
    image: "https://www.plants.com/images/1566416548156_20190821-1566416549015.png"
  }, { 
    id: 8, 
    name: 'Fiddle Leaf Fig', 
    price: 20.00, 
    category: [], 
    quantity: 20, 
    image: "https://d3gkbidvk2xej.cloudfront.net/images/products/v2/b3b6de3b-6fad-45da-8471-f65e8271d0d4.jpeg?version=1608581569.22390019800"
  }, {
    id: 9, 
    name: 'Spider Plant', 
    price: 15.00, 
    category: ['Best Seller', 'Low Maintenance'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0212/1030/0480/products/spider-plant_2.jpg?v=1616007405"
  }
];

function App():JSX.Element {

  // const getTotalItems = (items:CartItemType[]) => 
  //  items.reduct((ack: number, item) => ack + item.amount, 0);

  // const handleAddToCart = () => null;
   
  // const handleRemoveFromCart = () => null;

  // if ( isLoading ) return <LinearProgress />;
  // if ( error ) return <div>Something went wrong... </div>

  return (
    <div>
      <Router >
        <Nav />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/plants"><AllPlants /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/contact"><Contact /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
