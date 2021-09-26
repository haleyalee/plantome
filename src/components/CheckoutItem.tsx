import React from 'react'

type Props = {
  image: string,
  name: string,
  price: number,
  quantity: number
}

export default function CheckoutItem(props:Props):JSX.Element {
  return (
    <div className="d-flex p-2 mt-4">
      <img className="me-3" src={props.image} alt={props.name} width="100px" height="120px" />
      <div className="d-flex w-100 flex-column justify-content-between"> 
        <div>
          {/* Name */}
          <h6 className="pe-3">{props.name}</h6>
        </div>
        <div className="d-flex">
          {/* Price  */}
          <p className="m-0 me-3"><strong>${props.price.toFixed(2)}</strong></p>
          <p className="m-0">x{props.quantity}</p>
        </div>
      </div>
    </div>
  )
}
