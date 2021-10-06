import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid';

// import context
import AppContext from '../../contexts';

// import components
import PlantItem from '../PlantItem';
import Plant from '../../entities/plant';

type Props = {
  pageName: string,
  addToCart: (item:Plant, qty:number)=>void
}

function ShopFilteredPlants(props:Props):JSX.Element {

  const { plants } = useContext(AppContext);

  // useEffect(() => {
  //   fetch('https://szhy1liq97.execute-api.us-east-2.amazonaws.com/Prod/plants')
  //   .then( response => response.json())
  //   .then( plnts => setPlants(plnts))
  //   .catch( error => console.log(error));
  // }, [setPlants])

  return (
    <div className="container py-5">
      <h2 className="pb-4">{props.pageName}</h2>
      <Grid container spacing={4} id="plant-grid">
        { plants.map( (plant) => 
          plant.category.includes(props.pageName) 
          ?
          <Grid key={plant.id} item xs={12} sm={6} md={4} lg={3}>
            <PlantItem key={plant.id} plant={plant} addToCart={props.addToCart} />
          </Grid>
          :
          <div key={plant.id}></div>
        ) }
      </Grid>
    </div>
  )
}

export default ShopFilteredPlants
