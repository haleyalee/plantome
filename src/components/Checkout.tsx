import React, { useState, useEffect } from 'react';

// import styles
import '../styles/Checkout.css';
import AddressForm from './AddressForm';

// import components
import CheckoutItem from './CheckoutItem';

function Checkout():JSX.Element {

  // Sign in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Shipping Address
  const [name, setName] = useState('');
  const [shipAddrStreet, setShipAddrStreet] = useState('');
  const [shipAddrExtra,  setShipAddrExtra] = useState('');
  const [shipAddrCity,   setShipAddrCity] = useState('');
  const [shipAddrState,  setShipAddrState] = useState('');
  const [shipAddrZip,    setShipAddrZip] = useState('');
  const [useAsBilling,   setUseAsBilling] = useState(false);

  // Payment Details
  const [cardType, setCardType] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNum,  setCardNum] = useState('');
  const [cardExp,  setCardExp] = useState('');
  const [cardCVV,  setCardCVV] = useState('');
  const [billAddrStreet, setBillAddrStreet] = useState('');
  const [billAddrExtra,  setBillAddrExtra] = useState('');
  const [billAddrCity,   setBillAddrCity] = useState('');
  const [billAddrState,  setBillAddrState] = useState('');
  const [billAddrZip,    setBillAddrZip] = useState('');

  // Order Summary
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubtotal(10);
    setTax(subtotal*0.06);
    setTotal(subtotal+tax);
  }, [subtotal, tax, setSubtotal, setTax, setTotal]);

  const [todayDate] = useState(new Date());

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
  
  const handlePlaceOrder = () => {
    console.log(name);
    console.log(shipAddrStreet);
    console.log(shipAddrCity);
    console.log(shipAddrState);
    console.log(shipAddrZip);
    console.log(useAsBilling);

    console.log(cardType);
    console.log(cardName);
    console.log(cardNum);
    console.log(cardExp);
    console.log(cardCVV);
    console.log(billAddrStreet);
    console.log(billAddrCity);
    console.log(billAddrState);
    console.log(billAddrZip);
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-8">
          <h2 className="pb-3">Checkout</h2>

          <div className="mb-5">
            <div id="easy-checkout" className="d-flex justify-content-between bg-light p-4 mb-2">
              <h6 className="m-0">Make checking out easy! Sign in now.</h6>
              <a role="button" data-toggle="collapse" href="#signInToggle" aria-expanded="false" aria-controls="signInToggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </a>
            </div>
            <div className="collapse" id="signInToggle">
              <div className="card card-body">
                <form>
                  <div className="form-floating mb-3">
                    <input id="email" type="text" className="form-control" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input id="password" type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-flex flex-row-reverse">
                    <button className="btn btn-secondary">Sign In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          

          {/* Shipping Address */}
          <div id="shipping-address" className="mb-5">
            <h4 className="mb-3">Shipping Address</h4>
            <form id="shipping-address-form">
              <label className="form-label">Name</label>
              <div className="form-floating mb-3">
                <input 
                  id="name" 
                  type="text" 
                  className="form-control" 
                  placeholder="First &#38; Last Name" 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)} 
                />
                <label htmlFor="name" className="form-label">Name</label>
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
            </form>
          </div>

          {/* Payment Details */}
          <div id="payment-details" className="mb-5">
            <h4 className="mb-3">Payment Details</h4>
            <form id="payment-details-form">
              <div className="d-flex flex-column mb-3">
                <label className="form-label">Card Information</label>
                <div className="form-floating mb-3">
                  <select id="cardType" className="form-select" value={cardType} onChange={(e)=>setCardType(e.target.value)}>
                    <option value="select">Select card type...</option>
                    <option value="Visa">Visa</option>
                  </select>
                  <label htmlFor="cardType" className="form-label">Card Type</label>
                </div>
                <div className="form-floating mb-3">
                  <input 
                    id="cardName" 
                    type="text" 
                    className="form-control" 
                    placeholder="First &#38; Last Name" 
                    value={cardName} 
                    onChange={(e)=>setCardName(e.target.value)} 
                  />
                  <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                </div>
                <div className="d-flex">
                  <div id="divCardNum" className="form-floating mb-3">
                    <input 
                      id="cardNum" 
                      type="text" 
                      className="form-control" 
                      placeholder="Card Number" 
                      value={cardNum} 
                      onChange={(e)=>setCardNum(e.target.value)} 
                    />
                    <label htmlFor="cardNum" className="form-label">Card Number</label>
                  </div>
                  <div id="divCardExp" className="form-floating mb-3">
                    <input
                      id="cardExp"
                      type="text"
                      className="form-control"
                      placeholder="MM/YY"
                      value={cardExp}
                      onChange={(e)=>setCardExp(e.target.value)}
                    />
                    <label htmlFor="cardExp" className="form-label">MM/YY</label>
                  </div>
                  <div id="divCardCVV" className="form-floating mb-3">
                    <input
                      id="cardCVV"
                      type="text"
                      className="form-control"
                      placeholder="CVV"
                      value={cardCVV}
                      onChange={(e)=>setCardCVV(e.target.value)}
                    />
                    <label htmlFor="cardCVV" className="form-label">CVV</label>
                  </div>
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
            </form>
          </div>

          {/* Review Order */}
          <div id="review-order" className="mb-5">
            <h4 className="mb-3">Review Order</h4>
            <div className="shipment mb-3">
              <h5 className="mb-3">Shipment 1 of 1</h5>
              <div className="shipment-box bg-light">
                <h6>Delivery date: {todayDate.getMonth()} </h6>
                <div>
                  <CheckoutItem />
                  <CheckoutItem />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-middle align-content-center">
              <h5 className="my-auto h-100">Total: $0.00</h5>
              <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </div>
        </div>

        <div className="col-1"></div>

        <div id="order-summary" className="col-3 bg-light p-4">
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
              <p><strong>${total.toFixed(2)}</strong></p>
            </div>
            <button className="btn btn-primary mt-4" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Checkout;
