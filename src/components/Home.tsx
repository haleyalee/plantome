import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';

// import external stylesheet
import '../styles/App.css';

// import context
import AppContext from '../contexts';
import Plant from '../entities/plant';

// import components
import CompanyCard from './CompanyCard';
import PlantItem from './PlantItem';

type Props = {
  addToCart: (item:Plant)=>void
}

function Home(props:Props):JSX.Element {

  const {plants} = useContext(AppContext);

  return (
    <div>

      {/* Jumbotron */}
      <div id="jumbotron" className="jumbotron jumbotron-fluid bg-light py-5" style={{height: "60vh"}}>
        <div className="container py-5">
          <h1 className="display-6 pb-3">Any plant, right to your front door.</h1>
          <p className="lead">Sign up now for 15% off your first order and monthly plant care tips.</p>
          <div className="d-flex flex-row pt-5">
            <div>
              <a className="btn btn-primary btn-lg" href="#" role="button">Sign Up</a>
            </div>
            <div className="mx-3">
              <a className="btn btn-outline-primary btn-lg" href="#" role="button">Shop Now</a>
            </div>
          </div>
        </div> 
      </div>

      {/* Cards */}
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-md-4 py-sm-3">
            <CompanyCard feature={"Free Shipping"} />
          </div>
          <div className="col-sm-12 col-md-4 py-sm-3">
            <CompanyCard feature={"Customer Support"} />
          </div>
          <div className="col-sm-12 col-md-4 py-sm-3">
            <CompanyCard feature={"Secure Payment"} />
          </div>
        </div>
      </div>


      {/* Best Sellers */}
      <div className="container py-5">
        <h3 className="pb-4">Best Sellers</h3>

        <Grid container spacing={4}>
          { plants.map( (plant) => 
            <Grid key={plant.id} item xs={12} sm={6} md={4} lg={3}>
              <PlantItem key={plant.id} plant={plant} addToCart={props.addToCart}/>
            </Grid>
          ) }
        </Grid>
      </div>
    </div>
  );
}

export default Home;
