import React from 'react'

import Plant from '../entities/plant';

export default function CheckoutItem():JSX.Element {
  return (
    <div className="d-flex p-2 mt-4">
      <img className="me-3" src={""} alt={""} width="100px" height="120px" />
      <div className="d-flex w-100 flex-column justify-content-between"> 
        <div>
          {/* Name */}
          <h6 className="pe-3">Plant Name</h6>
        </div>
        <div className="d-flex">
          {/* Price  */}
          <p className="m-0 me-3"><strong>$0.00</strong></p>
          <p className="m-0">x01</p>
        </div>
      </div>
    </div>
  )
}
