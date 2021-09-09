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
