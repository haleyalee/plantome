import React from 'react'
// import bootstrap from 'bootstrap';
// window.bootstrap = require('bootstrap');

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

  // useEffect(() => {
  //   const toastTrigger = document.getElementById('addToCartBtn')
  //   const toastLiveExample = document.getElementById('addToCartToast')
  //   if (toastTrigger) {
  //     toastTrigger.addEventListener('click', function () {
  //       const toast = new bootstrap.Toast(toastLiveExample)

  //       toast.show()
  //     })  
  //   }
  // })

  return (
    <div className="card text-center" >
      
      {/* Hover to show add to cart button */}
      {/* { isHovering && 
      <div className="position-absolute hoverToAdd" onMouseLeave={handleMouseOut}>
        <button className="btn btn-secondary" style={{opacity: 1}} onClick={() => props.addToCart(props.plant)}>Add to Cart</button>
      </div> }

      <div className="position-relative" onMouseOver={handleMouseOver}>
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
        <button id="addToCartBtn" className="btn btn-outline-secondary mb-3" style={{opacity: 1}} onClick={() => props.addToCart(props.plant)}>Add to Cart</button>
      </div>

      {/* Success message */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
        <div id="addToCartToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PlantItem;
