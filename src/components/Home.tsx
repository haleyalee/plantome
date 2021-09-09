import React, {useState } from  'react';
import Grid from '@material-ui/core/Grid';

// import external stylesheet
import '../styles/App.css';

// import components
import CompanyCard from './CompanyCard';
import Plant from './Plant';

const data = [
	{ id: 0, name: 'Monstera', 
    price: 19.00, 
    category: ['Tropical', 'Best Seller'], 
    quantity: 20, 
    image: "https://images.squarespace-cdn.com/content/v1/5dae1d52f3de04278ab6e9fc/1579574405009-9IFAHHNT2SHMDACR8ZUI/Monstera.jpg?format=1500w" 
  }, { 
    id: 1, 
    name: 'Croton', 
    price: 18.00, 
    category: ['Tropical', 'Best Seller', 'Beginner'], 
    quantity: 20, 
    image: "https://www.jacksonandperkins.com/images/xxl/v2435.jpg"
  }, { 
    id: 2, 
    name: 'Lemon Lime Dracaena', 
    price: 15.00, 
    category: ['Tropical', 'Best Seller', 'Beginner'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0260/3037/4957/products/large-plant-lemon-lime-dracaena-seafoam-pot.jpg?v=1623332685" 
  }, { 
    id: 3, 
    name: 'Golden Pothos', 
    price: 15.00, 
    category: ['Best Seller', 'Beginner', 'Low Maintenance'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0252/3928/9903/products/golden-pothos-589505_900x.jpg?v=1606341920" 
  }, { 
    id: 4, 
    name: 'Dracaena Marginata', 
    price: 15.00, 
    category: ['Best Seller', 'Tropical'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/2528/3612/products/Dracaena_Marginata_Cane_tappered_700x700.jpg?v=1605810638"
  }, { 
    id: 5, 
    name: 'Snake Plant', 
    price: 15.00, 
    category: ['Best Seller', 'Beginner', 'Low Maintenance'], 
    quantity: 20, 
    image: "https://www.thespruce.com/thmb/_6OfTexQcyd-3aW8Z1O2y78sc-Q=/2048x1545/filters:fill(auto,1)/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg"
  }, { 
    id: 6, 
    name: 'Peace Lily', 
    price: 15.00, 
    category: ['Best Seller'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0212/1030/0480/products/peace-lily-plant.jpg?v=1612898818"
  }, { 
    id: 7, 
    name: 'Majesty Palm', 
    price: 20.00, 
    category: ['Best Seller', 'Tropical'], 
    quantity: 20, 
    image: "https://www.plants.com/images/1566416548156_20190821-1566416549015.png"
  }, { 
    id: 8, 
    name: 'Fiddle Leaf Fig', 
    price: 20.00, 
    category: [], 
    quantity: 20, 
    image: "https://d3gkbidvk2xej.cloudfront.net/images/products/v2/b3b6de3b-6fad-45da-8471-f65e8271d0d4.jpeg?version=1608581569.22390019800"
  }, {
    id: 9, 
    name: 'Spider Plant', 
    price: 15.00, 
    category: ['Best Seller', 'Low Maintenance'], 
    quantity: 20, 
    image: "https://cdn.shopify.com/s/files/1/0212/1030/0480/products/spider-plant_2.jpg?v=1616007405"
  }
];

function Home():JSX.Element {

  const [plants, setPlants] = useState(data);

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
              <Plant key={plant.id} name={plant.name} price={plant.price} category={plant.category} quantity={plant.quantity} image={plant.image} />
            </Grid>
          ) }
        </Grid>
      </div>
    </div>
  );
}

export default Home;
