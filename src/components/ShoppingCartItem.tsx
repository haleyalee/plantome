import React from 'react'
import QuantityTicker from './QuantityTicker'

// import types
// import CartItemType from './App';

// import components


const itemStyle = {
  width: "300px",
}

function ShoppingCartItem():JSX.Element {
  return (
    <div className="d-flex py-3" style={itemStyle}>
      <img className="me-3" src="" alt="" width="98px" height="120px" />
      <div className="d-flex w-100 flex-column justify-content-between"> 
        <div className="d-flex justify-content-between">
          <h6>Plant Name</h6>
          <h6>$0.00</h6>
        </div>
        <div className="d-flex justify-content-between">
          <QuantityTicker />
          <a><u>delete</u></a>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartItem
