import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid';

// import context
import AppContext from '../../contexts';

// import components
import PlantItem from './../PlantItem';
import Plant from '../../entities/plant';

type Props = {
  addToCart: (item:Plant)=>void
}

function ShopPlants(props:Props):JSX.Element {

  const { plants } = useContext(AppContext);

  return (
    <div className="container py-5">
      <h2 className="pb-4">All Plants</h2>
      <Grid container spacing={4}>
        { plants.map( (plant) => 
          <Grid key={plant.id} item xs={12} sm={6} md={4} lg={3}>
            <PlantItem key={plant.id} plant={plant} addToCart={props.addToCart} />
          </Grid>
        ) }
      </Grid>
    </div>
  )
}

export default ShopPlants
