import React from 'react'

// import types
// import { CartItemType } from './App'

// import components
import ShoppingCartItem from './ShoppingCartItem'

// type Props = {
//   cartItems: CartItemType[];
// }

function ShoppingCart():JSX.Element {
  return (
    <div className="container px-4 py-4">
      <h3 className="pb-3">Shopping Cart</h3>
      <ShoppingCartItem />
      <ShoppingCartItem />
      
    </div>
  )
}

export default ShoppingCart
