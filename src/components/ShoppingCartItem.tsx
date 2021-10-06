import React, {useState, useEffect} from 'react'

// import components
import Plant from '../entities/plant';

import "../styles/ShoppingCart.css"

type Props = {
  plant: Plant,
  addToCart: (item:Plant, qty:number)=>void,
  removeFromCart: (item:Plant)=>void,
  findSubtotal: (itemPrice:number)=>void
}

function ShoppingCartItem(props:Props):JSX.Element {

  const [count, setCount] = useState(props.plant.quantity);
  const minusId = "minus_" + props.plant.id;
  const plusId = "plus_" + props.plant.id;

  useEffect(() => {
    setCount(props.plant.quantity)

    // disable decrement if quantity is 1
    if (count === 1) {
      document.getElementById(minusId)?.classList.add("disabled");
    } else {
      document.getElementById(minusId)?.classList.remove("disabled");
    }
  }, [props.plant.quantity]);

  // render subtotal
  useEffect(() => {
    props.findSubtotal(props.plant.quantity * props.plant.price);
  });

  useEffect(() => {
    props.addToCart(props.plant, count);
  }, [count])

  const handleMinus = () => {
    if (count-1 >= 0) {
      setCount(count-1);
      props.plant.quantity -= 1;
    }
  }

  const handlePlus = () => {
    setCount(count+1);
    props.plant.quantity += 1;
  }

  return (
    <div className="item d-flex p-2 mt-4">
      <img className="me-3" src={props.plant.image} alt={props.plant.name} width="100px" height="120px" />
      <div className="d-flex w-100 flex-column justify-content-between"> 
        <div className="d-flex justify-content-between">
          {/* Name */}
          <h6 className="pe-3">{props.plant.name}</h6>
          {/* Total Price (adjusted to quantity) */}
          <h6>${(props.plant.quantity * props.plant.price).toFixed(2)}</h6>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          {/* Quantity */}
          <div className="d-flex">
            <p className="m-0 pe-2">Qty</p>
            <span className="m-0">
              <button id={minusId} className="btn btn-outline-secondary p-0 px-1 text-center qty-btn" onClick={handleMinus}>-</button>
              <a> {props.plant.quantity} </a>
              <button id={plusId} className="btn btn-outline-secondary p-0 px-1 text-center qty-btn" onClick={handlePlus}>+</button>
            </span>
          </div>
          {/* Delete button */}
          <a className="black" role="button" onClick={() => props.removeFromCart(props.plant)}><u>delete</u></a>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartItem
