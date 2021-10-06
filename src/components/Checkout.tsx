import React, { useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// import styles
import '../styles/Checkout.css';
import AddressForm from './AddressForm';

// import contexts and entities
import Plant from '../entities/plant';
import { CartContext } from '../contexts';

// import components
// import CheckoutItem from './CheckoutItem';
import ReviewOrder from './ReviewOrder';

// type Props = {
//   cart: Plant[];
//   signedIn: boolean,
//   handleSignIn: (state:boolean)=>void,
//   handlePlacedOrder: ()=>void,
//   history: any
// }

// eslint-disable-next-line
function Checkout(props:any):JSX.Element {

  // Sign in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const easyCheckout = document.getElementById('divEasyCheckout');
    if (props.signedIn) {
      if(easyCheckout) easyCheckout.style.display = "none";
    } 
    else {
      if(easyCheckout) easyCheckout.style.display = "block";
    }
  });

  const signIn = (e:React.SyntheticEvent) => {
    e.preventDefault();
    Auth.signIn({
      username: email,
      password: password
    })
    .then( () => {
      console.log("Successfully signed in"); 
      props.handleSignIn(true); 
    })
    .catch((error) => {
      console.log(`Error signing in: ${error.message}`)
    })
  }

  // Shipping Address
  const [name, setName] = useState('');
  const [shipAddrStreet, setShipAddrStreet] = useState('');
  const [shipAddrExtra,  setShipAddrExtra] = useState('');
  const [shipAddrCity,   setShipAddrCity] = useState('');
  const [shipAddrState,  setShipAddrState] = useState('');
  const [shipAddrZip,    setShipAddrZip] = useState('');
  const [useAsBilling,   setUseAsBilling] = useState(false);

  // Payment Details
  // const [cardType, setCardType] = useState('');
  const [cardName, setCardName] = useState('');
  // const [cardNum,  setCardNum] = useState('');
  // const [cardExp,  setCardExp] = useState('');
  // const [cardCVV,  setCardCVV] = useState('');
  const [billAddrStreet, setBillAddrStreet] = useState('');
  const [billAddrExtra,  setBillAddrExtra] = useState('');
  const [billAddrCity,   setBillAddrCity] = useState('');
  const [billAddrState,  setBillAddrState] = useState('');
  const [billAddrZip,    setBillAddrZip] = useState('');

  // Stripe
  const options = {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: '16px',
        fontFamily: 'Segoe UI, sans-serif'
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  const stripe = useStripe();
  const elements = useElements();

  // Order Summary
  const {cart} = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);

  let subtotalArr:number[] = cart.map( (item:Plant) => item.price * item.quantity );

  useEffect(() => {
    if (cart.length > 0) {
      subtotalArr = cart.map( (item:Plant) => item.price * item.quantity );
      setSubtotal(subtotalArr.reduce( (prev:number, curr:number) => prev + curr));
    }
  }, [cart]);

  useEffect(() => {
    setTax(subtotal*0.06);
  }, [subtotal])

  // Use Shipping Address as Billing Address
  const toggleUseAsBilling = () => {

    setUseAsBilling(!useAsBilling);
    
    const billAddr = ['billAddrStreet', 'billAddrExtra', 'billAddrCity', 'billAddrState', 'billAddrZip'];
    if (!useAsBilling) {
      setBillAddrStreet(shipAddrStreet);
      setBillAddrExtra(shipAddrExtra);
      setBillAddrCity(shipAddrCity);
      setBillAddrState(shipAddrState);
      setBillAddrZip(shipAddrZip);
      billAddr.map((id) => document.getElementById(id)?.setAttribute('disabled', ''));
    }
    else {
      setBillAddrStreet('');
      setBillAddrExtra('');
      setBillAddrCity('');
      setBillAddrState('');
      setBillAddrZip('');
      billAddr.map((id) => document.getElementById(id)?.removeAttribute('disabled'));
    }
  }
  
  const handlePlaceOrder = async (e:React.SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // eslint-disable-next-line
    const cardElement = elements.getElement(CardElement)!;
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      
      // form validation
      const form = document.getElementById("checkoutForm") as HTMLFormElement;
      if (!form.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      }
      else {
        console.log("Successfully placed order");
        props.handlePlacedOrder();
        props.emptyCart();
        props.history.push('/checkout/order-confirmation');
      }
      form.classList.add('was-validated');
    }

  }

  return (
    <div className="container py-5">
      <h2 id="mobile-header" className="pb-3">Checkout</h2>
      <div id="checkout" className="row">

        {/* Order Summary */}
        <div id="order-summary" className="col-sm-12 col-lg-3 bg-light p-4">
          <h3 className="pb-3">Order Summary</h3>
          <div className="d-flex flex-column">
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
            <button type="submit" className="btn btn-primary mt-4" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>

        <div className="col-sm-12 col-lg-1"></div>

        <div className="col-sm-12 col-lg-8 p-0">
          <h2 id="web-header" className="pb-3">Checkout</h2>

          {/* Easy Checkout */}
          <div id="divEasyCheckout" className="mb-5">
            <div id="easy-checkout" className="d-flex justify-content-between bg-light p-4">
              <h6 className="m-0">Make checking out easy! Sign in now.</h6>
              <a role="button" data-toggle="collapse" href="#signInToggle" aria-expanded="false" aria-controls="signInToggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </a>
            </div>
            <div className="collapse" id="signInToggle">
              <div className="card card-body">
                <form >
                  <div className="form-floating mb-3">
                    <input id="email" type="text" className="form-control" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input id="password" type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-flex flex-row-reverse">
                    <button className="btn btn-secondary" onClick={signIn}>Sign In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Accordion */}
          <div className="accordion" id="checkoutAccordion">
            <form id="checkoutForm" className="needs-validation" noValidate onSubmit={handlePlaceOrder} >

              {/* Shipping Address */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headerShipAddr">
                  <button className="accordion-button" type="button" data-toggle="collapse" data-target="#collapseShipAddr">
                    <h5 className="m-0">Shipping Address</h5>
                  </button>
                </h2>
                <div id="collapseShipAddr" className="accordion-collapse collapse show" data-parent="#checkoutAccordion">
                  <div className="accordion-body">
                    <div id="shipping-address">
                      <label className="form-label">Name</label>
                      <div className="form-floating mb-3">
                        <input 
                          id="name" 
                          type="text" 
                          className="form-control" 
                          placeholder="First &#38; Last Name" 
                          value={name} 
                          onChange={(e)=>setName(e.target.value)} 
                          required
                        />
                        <label htmlFor="name" className="form-label">Recipient Name</label>
                        <div className="invalid-feedback">
                          Please provide a name.
                        </div>
                      </div>
                      <div className="d-flex flex-column mb-3">
                        <label className="form-label">Shipping Address</label>
                          <AddressForm
                            streetId="shipAddrStreet"
                            street={shipAddrStreet}
                            setStreet={setShipAddrStreet}
                            extraId="shipAddrExtra"
                            extra={shipAddrExtra}
                            setExtra={setShipAddrExtra}
                            cityId="shipAddrCity"
                            city={shipAddrCity}
                            setCity={setShipAddrCity}
                            stateId="shipAddrState"
                            state={shipAddrState}
                            setState={setShipAddrState}
                            zipcodeId="shipAddrZip"
                            zipcode={shipAddrZip}
                            setZipcode={setShipAddrZip}
                          />
                      </div>
                      <div className="form-check">
                        <input 
                          id="useAsBilling" 
                          type="checkbox" 
                          className="form-check-input" 
                          value="" 
                          checked={useAsBilling}
                          onChange={toggleUseAsBilling}
                          />
                        <label htmlFor="useAsBilling" className="form-check-label">Use as billing address</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headerPayDets">
                  <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapsePayDets">
                    <h5 className="m-0">Payment Details</h5>
                  </button>
                </h2>
                <div id="collapsePayDets" className="accordion-collapse collapse" data-parent="#checkoutAccordion">
                  <div className="accordion-body">
                    <div id="payment-details" >
                      <div className="d-flex flex-column mb-3">
                        <label className="form-label">Card Information</label>
                        {/* <div className="form-floating mb-3">
                          <select id="cardType" className="form-select" value={cardType} onChange={(e)=>setCardType(e.target.value)} required>
                            <option selected disabled value="">Select card type...</option>
                            <option value="Visa">Visa</option>
                            <option value="American Express">American Express</option>
                            <option value="Discover">Discover</option>
                            <option value="Mastercard">Mastercard</option>
                          </select>
                          <label htmlFor="cardType" className="form-label">Card Type</label>
                          <div className="invalid-feedback">
                            Please select a card type.
                          </div>
                        </div> */}
                        <div className="form-floating mb-3">
                          <input 
                            id="cardName" 
                            type="text" 
                            className="form-control" 
                            placeholder="First &#38; Last Name" 
                            value={cardName} 
                            onChange={(e)=>setCardName(e.target.value)} 
                            required
                          />
                          <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                          <div className="invalid-feedback">
                            Please provide a cardholder name.
                          </div>
                        </div>
                        <div className="form-control px-2 py-3" >
                          <CardElement options={options} />
                        </div>
                        <div id="card-info" className="d-flex">
                          {/* <div id="divCardNum" className="form-floating mb-3">
                            <input 
                              id="cardNum" 
                              type="text" 
                              className="form-control" 
                              placeholder="Card Number" 
                              value={cardNum} 
                              onChange={(e)=>setCardNum(e.target.value)} 
                              required
                            />
                            <label htmlFor="cardNum" className="form-label">Card Number</label>
                            <div className="invalid-feedback">
                              Please provide the card number.
                            </div>
                          </div>
                          <div id="exp-cvv" className="d-inline-flex">
                            <div id="divCardExp" className="form-floating mb-3">
                              <input
                                id="cardExp"
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                value={cardExp}
                                onChange={(e)=>setCardExp(e.target.value)}
                                required
                              />
                              <label htmlFor="cardExp" className="form-label">MM/YY</label>
                              <div className="invalid-feedback">
                                Please provide the card expiration date.
                              </div>
                            </div>
                            <div id="divCardCVV" className="form-floating mb-3">
                              <input
                                id="cardCVV"
                                type="text"
                                className="form-control"
                                placeholder="CVV"
                                value={cardCVV}
                                onChange={(e)=>setCardCVV(e.target.value)}
                                required
                              />
                              <label htmlFor="cardCVV" className="form-label">CVV</label>
                              <div className="invalid-feedback">
                                Please provide the card CVV.
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="d-flex flex-column mb-3">
                        <label className="form-label">Billing Address</label>
                        <AddressForm
                          streetId="billAddrStreet"
                          street={billAddrStreet}
                          setStreet={setBillAddrStreet}
                          extraId="billAddrExtra"
                          extra={billAddrExtra}
                          setExtra={setBillAddrExtra}
                          cityId="billAddrCity"
                          city={billAddrCity}
                          setCity={setBillAddrCity}
                          stateId="billAddrState"
                          state={billAddrState}
                          setState={setBillAddrState}
                          zipcodeId="billAddrZip"
                          zipcode={billAddrZip}
                          setZipcode={setBillAddrZip}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Review Order */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headerReviewOrder">
                  <button className="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseReviewOrder">
                    <h5 className="m-0">Review Order</h5>
                  </button>
                </h2>
                <div id="collapseReviewOrder" className="accordion-collapse collapse" data-parent="#checkoutAccordion">
                  <div className="accordion-body">
                    <div id="review-order" >
                      <div className="shipment mb-3">
                        <h5 className="mb-3">Shipment 1 of 1</h5>
                        <ReviewOrder cart={cart} />
                      </div>
                      <div className="d-flex justify-content-between align-middle align-content-center">
                        <h5 className="my-auto h-100">Total: ${(subtotal + tax).toFixed(2)}</h5>
                        <input type="submit" className="btn btn-primary" value="Place Order" onClick={handlePlaceOrder}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default withRouter(Checkout);
