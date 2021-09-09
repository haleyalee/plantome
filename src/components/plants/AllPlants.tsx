import React from 'react'
import Grid from '@material-ui/core/Grid';

// import components
import Plant from './../Plant';

function ShopPlants():JSX.Element {
  return (
    <div className="container py-5">
      <h2 className="pb-4">All Plants</h2>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Plant name={"Monstera"} price={19.00} category={["Tropical"]} quantity={20} image={"https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w"} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Plant name={"Monstera"} price={19.00} category={["Tropical"]} quantity={20} image={"https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w"} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Plant name={"Monstera"} price={19.00} category={["Tropical"]} quantity={20} image={"https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w"} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Plant name={"Monstera"} price={19.00} category={["Tropical"]} quantity={20} image={"https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w"} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Plant name={"Monstera"} price={19.00} category={["Tropical"]} quantity={20} image={"https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w"} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Plant name={"Monstera"} price={19.00} category={["Tropical"]} quantity={20} image={"https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w"} />
        </Grid>
        </Grid>
    </div>
  )
}

export default ShopPlants
