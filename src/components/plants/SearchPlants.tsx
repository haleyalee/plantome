import React from 'react';

import Grid from '@material-ui/core/Grid';

// import components
import PlantItem from '../PlantItem';
import Plant from '../../entities/plant';
import SearchBar from '../SearchBar';

type Props = {
  search: (results:Plant[])=>void,
  searchResult: Plant[],
  addToCart: (item:Plant)=>void,
  isAdmin: boolean
}

function SearchPlants(props:Props):JSX.Element {

  return (
    <div className="container py-5">
      <h2 className="pb-4">Search Plants</h2>  
      <div className="mb-4">
        <SearchBar search={props.search} />
      </div>
      { props.searchResult.length === 0
        ?
        <div className="d-flex justify-content-center"><em>Try a new search query!</em></div>
        :
        <Grid container spacing={4} id="plant-grid">
          { props.searchResult.map( (plant) => 
            <Grid key={plant.id} item xs={12} sm={6} md={4} lg={3}>
              <PlantItem key={plant.id} isAdmin={props.isAdmin} plant={plant} addToCart={props.addToCart} />
            </Grid>
          ) }
        </Grid>
      }
    </div>
  )
}

export default SearchPlants
