import React, {useState, useEffect} from 'react'

// import components
import Plant from '../entities/plant';


const itemStyle = {
  width: "300px",
}

type Props = {
  plant: Plant,
  addToCart: (item:Plant)=>void,
  removeFromCart: (item:Plant)=>void
}

function ShoppingCartItem(props:Props):JSX.Element {

  const [count, setCount] = useState(props.plant.quantity);

  const handleMinus = () => {
    if (count-1 >= 0) {
      setCount(count-1);
      props.plant.quantity -= 1;
    }
    console.log(props.plant)
  }

  const handlePlus = () => {
    setCount(count+1);
    props.plant.quantity += 1;
    console.log(props.plant)
  }

  useEffect(() => {
    setCount(props.plant.quantity)
    
    // disable decrement if quantity is 1
    if (count === 1) {
      document.getElementById("minus")?.classList.add("disabled");
    } else {
      document.getElementById("minus")?.classList.remove("disabled");
    }
  }, [props.plant.quantity]);

  return (
    <div className="d-flex py-3" style={itemStyle}>
      <img className="me-3" src={props.plant.image} alt={props.plant.name} width="98px" height="120px" />
      <div className="d-flex w-100 flex-column justify-content-between"> 
        <div className="d-flex justify-content-between">
          {/* Name */}
          <h6>{props.plant.name}</h6>
          {/* Total Price (adjusted to quantity) */}
          <h6>${(props.plant.quantity * props.plant.price).toFixed(2)}</h6>
        </div>
        <div className="d-flex justify-content-between">
          {/* Quantity */}
          <div className="d-flex">
            <p className="pe-2">Qty</p>
            <span>
              <button id="minus" className="btn btn-outline-secondary p-0 px-1 text-center" onClick={handleMinus}>-</button>
              <a> {props.plant.quantity} </a>
              <button id="plus" className="btn btn-outline-secondary p-0 px-1" onClick={handlePlus}>+</button>
            </span>
          </div>
          {/* Delete button */}
          <a role="button" onClick={() => props.removeFromCart(props.plant)}><u>delete</u></a>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartItem
