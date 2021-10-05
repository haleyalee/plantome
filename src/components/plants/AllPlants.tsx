import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// import context
import AppContext from '../../contexts';

// import components
import PlantItem from './../PlantItem';
// import Plant from '../../entities/plant';

// type Props = {
//   isAdmin: boolean,
//   addToCart: (item:Plant)=>void
// }

// eslint-disable-next-line
function ShopPlants(props:any):JSX.Element {

  const { plants, setPlants } = useContext(AppContext);

  useEffect(() => {
    fetch('https://szhy1liq97.execute-api.us-east-2.amazonaws.com/Prod/plants')
    .then( response => response.json())
    .then( plnts => setPlants(plnts))
    .catch( error => console.log(error));
  }, [setPlants])

  return (
    <div className="container py-5">
      <h2 className="pb-4">All Plants</h2>
      <Grid container spacing={4} id="plant-grid">
        { plants.map( (plant) => 
          <Grid key={plant.id} item xs={12} sm={6} md={4} lg={3}>
            <PlantItem key={plant.id} isAdmin={props.isAdmin} plant={plant} addToCart={props.addToCart} />
          </Grid>
        ) }
      </Grid>
    </div>
  )
}

export default withRouter(ShopPlants);
