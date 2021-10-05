import React from 'react';
import { withRouter } from 'react-router-dom';

// import external stylesheet
import '../styles/App.css';
import '../styles/Home.css';
import '../styles/scss/custom.css';

// import context
// import Plant from '../entities/plant';

// import components
import CompanyCard from './CompanyCard';
import FilteredPlants from './plants/FilteredPlants';

// type Props = {
//   addToCart: (item:Plant)=>void,
//   history:
// }

// eslint-disable-next-line
function Home(props:any):JSX.Element {

  return (
    <div>

      {/* Jumbotron */}
      <div id="jumbotron" className="jumbotron jumbotron-fluid bg-light py-5">
        <div className="container py-5">
          <h1 className="display-6 pb-3"><a>Any plant, right to your front door.</a></h1>
          <div className="lead">
            <a>Sign up now for 15% off your first order and monthly plant care tips.</a>
          </div>
          <div className="d-flex flex-row pt-5">
            <div>
              <a className="btn btn-primary btn-lg" href="#" role="button" onClick={() => props.history.push('/signup')}>Sign Up</a>
            </div>
            <div className="mx-3">
              <a className="btn btn-outline-primary btn-lg" href="#" role="button" onClick={() => props.history.push('/plants')} >Shop Now</a>
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

export default withRouter(Home);
