import React from 'react'

// import components
import ShoppingCartItem from './ShoppingCartItem'

// import entities
import Plant from '../entities/plant';

type Props = {
  cart: Plant[],
  addToCart: (item:Plant)=>void,
  removeFromCart: (item:Plant)=>void
}

function ShoppingCart(props:Props):JSX.Element {
  return (
    <div className="container px-4 py-4">
      <h3 className="pb-3">Shopping Cart</h3>
      {
        props.cart.map( (cartItem:Plant) => 
          <ShoppingCartItem key={cartItem.id} plant={cartItem} addToCart={props.addToCart} removeFromCart={props.removeFromCart} />
        )
      }      
    </div>
  )
}

export default ShoppingCart
