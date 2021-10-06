import React, {useState, useEffect, useContext} from 'react';
import {withRouter} from 'react-router-dom';

// import components
import ShoppingCartItem from './ShoppingCartItem'

// import contexts and entities
import Plant from '../entities/plant';
import { CartContext } from '../contexts';

// import styles
import '../styles/ShoppingCart.css';

// type Props = {
//   cart: Plant[],
//   addToCart: (item:Plant)=>void,
//   removeFromCart: (item:Plant)=>void,
//   close: (state:boolean)=>void,
//   history: History
// }

// eslint-disable-next-line
function ShoppingCart(props:any):JSX.Element {

  const [subtotal, setSubtotal] = useState(0);
  const {cart} = useContext(CartContext);
  const tax = subtotal * 0.06;

  let subtotalArr:number[] = cart.map( (item:Plant) => item.price * item.quantity );

  useEffect(() => {
    if (cart.length > 0) {
      subtotalArr = cart.map( (item:Plant) => item.price * item.quantity );
      setSubtotal(subtotalArr.reduce( (prev:number, curr:number) => prev + curr));
    }
  }, [subtotal, cart]);

  const handleShopNow = () => {
    props.history.push("/plants");
    props.close(false);
  }

  const findSubtotal = (itemPrice:number) => {
    setSubtotal(subtotal + itemPrice)
  }

  const switchToCheckout = () => {
    props.history.push('/checkout');
    props.close(false);
  }

  return (
    <div id="cart" className="container px-4 py-4">
      <h3 className="pb-3">Shopping Cart</h3>
      {
        (cart.length === 0)
        ?
        // Empty Cart
        <div className="d-flex flex-column justify-content-center">
          <div className="text-center pb-3">
            <p className="mb-1"><em>You have no items in your cart...</em></p>
            <p><em>Let&apos;s start shopping!</em></p>
          </div>
          <button className="btn btn-primary" onClick={handleShopNow}>Shop Now</button>
        </div>
        :
        // Items in Cart
        <div>
          {/* Items */}
          { 
            cart.map( (cartItem:Plant) => 
              <ShoppingCartItem 
                key={cartItem.id} 
                plant={cartItem} 
                addToCart={props.addToCart} 
                removeFromCart={props.removeFromCart}
                findSubtotal={findSubtotal} 
              />
            )
          }
          {/* Price Breakdown */}
          <div className="d-flex flex-column">
            <hr className="my-4" />
            <div className="d-flex justify-content-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Shipping</p>
              <p>FREE</p>
            </div>
            <div className="d-flex justify-content-between">
              <p><strong>Total</strong></p>
              <p><strong>${(subtotal + tax).toFixed(2)}</strong></p>
            </div>
            <button className="btn btn-primary my-4" onClick={switchToCheckout}>Checkout</button>
          </div>
        </div>
      }    
    </div>
  )
}

export default withRouter(ShoppingCart)
