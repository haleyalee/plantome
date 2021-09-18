import React from 'react';

import Grid from '@material-ui/core/Grid';

// import components
import PlantItem from '../PlantItem';
import Plant from '../../entities/plant';
import SearchBar from '../SearchBar';

type Props = {
  search: (results:Plant[])=>void,
  searchResult: Plant[],
  addToCart: (item:Plant)=>void
}

function SearchPlants(props:Props):JSX.Element {

  return (
    <div className="container py-5">
      <div className="mb-4">
        <SearchBar search={props.search} />
      </div>
      <h2 className="pb-4">Search Results</h2>
      <Grid container spacing={4}>
        { props.searchResult.map( (plant) => 
          <Grid key={plant.id} item xs={12} sm={6} md={4} lg={3}>
            <PlantItem key={plant.id} plant={plant} addToCart={props.addToCart} />
          </Grid>
        ) }
      </Grid>
    </div>
  )
}

export default SearchPlants
