import React from 'react';

// import external stylesheet
import '../styles/App.css';

// import context
import Plant from '../entities/plant';

// import components
import CompanyCard from './CompanyCard';
import FilteredPlants from './plants/FilteredPlants';

type Props = {
  addToCart: (item:Plant)=>void
}

function Home(props:Props):JSX.Element {

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
          <CompanyCard feature={"Free Shipping"} />
          <CompanyCard feature={"Customer Support"} />
          <CompanyCard feature={"Secure Payment"} />
        </div>
      </div>


      {/* Best Sellers */}
      <FilteredPlants pageName={"Best Seller"} addToCart={props.addToCart} />
      
    </div>
  );
}

export default Home;
