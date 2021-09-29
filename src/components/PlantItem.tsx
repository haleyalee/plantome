import React from 'react'

import Plant from '../entities/plant';

type Props = {
  plant: Plant,
  addToCart: (plant:Plant)=>void
}

function PlantItem(props:Props):JSX.Element {

  // const [isHovering, setIsHovering] = useState(false);

  // const handleMouseOver = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseOut = () => {
  //   setIsHovering(false);
  // };

  return (
    <div className="card text-center" >
      
      {/* Hover to show add to cart button */}
      {/* { isHovering && 
      <div className="position-absolute hoverToAdd" onMouseLeave={handleMouseOut}>
        <button className="btn btn-secondary" style={{opacity: 1}} onClick={() => props.addToCart(props.plant)}>Add to Cart</button>
      </div> }

      <div id="plant-card" className="position-relative" onMouseOver={handleMouseOver}>
        <img className="card-img-top" src={props.plant.image} alt={props.plant.name} width="200px" height="250px"/>
        <div className="card-body">
          <p className="card-title">{props.plant.name}</p>
          <p className="card-text">${props.plant.price.toFixed(2)}</p>
        </div>
      </div> */}

      <div>
        <img className="card-img-top" src={props.plant.image} alt={props.plant.name} width="200px" height="250px"/>
        <div className="card-body">
          <p className="card-title">{props.plant.name}</p>
          <p className="card-text">${props.plant.price.toFixed(2)}</p>
        </div>
        <button id="addToCartBtn" className="btn btn-outline-secondary mb-3" style={{opacity: 1}} onClick={()=>props.addToCart(props.plant)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default PlantItem;
