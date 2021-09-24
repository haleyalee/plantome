import React, { useState, useEffect } from 'react';

// import styles
import '../styles/Checkout.css';

// import components
import CheckoutItem from './CheckoutItem';

function Checkout():JSX.Element {

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

  const [todayDate] = useState(new Date());

  // Use Shipping Address as Billing Address
  useEffect(() => {
    const billAddr = ['billAddrStreet', 'billAddrExtra', 'billAddrCity', 'billAddrState', 'billAddrZip'];
    if (useAsBilling) {
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
  })
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
            <div id="easy-checkout" className="d-flex justify-content-between bg-light p-4 mb-3">
              <h6 className="m-0">Make checking out easy! Sign in now.</h6>
              <a role="button" data-toggle="collapse" href="#signInToggle" aria-expanded="false" aria-controls="signInToggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </a>
            </div>
            <div className="collapse" id="signInToggle">
              <div className="card card-body">
                Sign In!
              </div>
            </div>
          </div>
          

          {/* Shipping Address */}
          <div id="shipping-address" className="mb-5">
            <h4 className="mb-3">Shipping Address</h4>
            <form id="shipping-address-form">
              <div className="d-flex flex-column mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  id="name" 
                  type="text" 
                  className="form-control" 
                  placeholder="First &#38; Last Name" 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)} 
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="form-label">Shipping Address</label>
                <div className="d-flex mb-3">
                  <input 
                    id="shipAddrStreet" 
                    type="text" 
                    className="form-control w-75 me-3" 
                    placeholder="Street Address or P.O. Box" 
                    value={shipAddrStreet} 
                    onChange={(e)=>setShipAddrStreet(e.target.value)} 
                  />
                  <input 
                    id="shipAddrExtra" 
                    type="text" 
                    className="form-control w-25" 
                    placeholder="Apt., Suite, Unit, Building, etc." 
                    value={shipAddrExtra} 
                    onChange={(e)=>setShipAddrExtra(e.target.value)}
                  />
                </div>
                <div className="d-flex">
                  <input 
                    id="shipAddrCity" 
                    type="text" 
                    className="form-control w-50 me-3" 
                    placeholder="City" 
                    value={shipAddrCity}
                    onChange={(e)=>setShipAddrCity(e.target.value)}
                  />
                  <select id="shipAddrState" className="form-select w-25 me-3" value={shipAddrState} onChange={(e)=>setShipAddrState(e.target.value)}>
                    <option value="select">Select state...</option>
                    <option value="Florida">Florida</option>
                  </select>
                  <input 
                    id="shipAddrZip" 
                    type="text" 
                    className="form-control w-25" 
                    placeholder="Zipcode" 
                    value={shipAddrZip} 
                    onChange={(e)=>setShipAddrZip(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-check">
                <input 
                  id="useAsBilling" 
                  type="checkbox" 
                  className="form-check-input" 
                  value="" 
                  checked={useAsBilling}
                  onChange={()=>setUseAsBilling(!useAsBilling)}
                />
                <label htmlFor="useAsBilling" className="form-check-label">Use as billing address</label>
              </div>
            </form>
          </div>

          {/* Payment Details */}
          <div id="payment-details" className="mb-5">
            <h4 className="mb-3">Payment Details</h4>
            <form id="payment-detailsform">
              <div className="d-flex flex-column mb-3">
                <label htmlFor="cardType" className="form-label">Card Type</label>
                <select id="cardType" className="form-select me-3" value={cardType} onChange={(e)=>setCardType(e.target.value)}>
                  <option value="select">Select card type...</option>
                  <option value="Visa">Visa</option>
                </select>
              </div>
              <div className="d-flex flex-column mb-3">
                <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                <input 
                  id="cardName" 
                  type="text" 
                  className="form-control" 
                  placeholder="First &#38; Last Name" 
                  value={cardName} 
                  onChange={(e)=>setCardName(e.target.value)} 
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="form-label">Card Details</label>
                <div className="d-flex">
                  <input 
                    id="cardNum" 
                    type="text" 
                    className="form-control" 
                    placeholder="Card Number" 
                    value={cardNum} 
                    onChange={(e)=>setCardNum(e.target.value)} 
                  />
                  <input
                    id="cardExp"
                    type="text"
                    className="form-control"
                    placeholder="MM/YY"
                    value={cardExp}
                    onChange={(e)=>setCardExp(e.target.value)}
                  />
                  <input
                    id="cardCVV"
                    type="text"
                    className="form-control"
                    placeholder="CVV"
                    value={cardCVV}
                    onChange={(e)=>setCardCVV(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="form-label">Billing Address</label>
                <div className="d-flex mb-3">
                  <input 
                    id="billAddrStreet" 
                    type="text" 
                    className="form-control w-75 me-3" 
                    placeholder="Street Address or P.O. Box" 
                    value={billAddrStreet} 
                    onChange={(e)=>setBillAddrStreet(e.target.value)} 
                  />
                  <input 
                    id="billAddrExtra" 
                    type="text" 
                    className="form-control w-25" 
                    placeholder="Apt., Suite, Unit, Building, etc." 
                    value={billAddrExtra} 
                    onChange={(e)=>setBillAddrExtra(e.target.value)}
                  />
                </div>
                <div className="d-flex">
                  <input 
                    id="billAddrCity" 
                    type="text" 
                    className="form-control w-50 me-3" 
                    placeholder="City" 
                    value={billAddrCity}
                    onChange={(e)=>setBillAddrCity(e.target.value)}
                  />
                  <select id="billAddrState" className="form-select w-25 me-3" value={billAddrState} onChange={(e)=>setBillAddrState(e.target.value)}>
                    <option value="select">Select state...</option>
                    <option value="Florida">Florida</option>
                  </select>
                  <input 
                    id="billAddrZip" 
                    type="text" 
                    className="form-control w-25" 
                    placeholder="Zipcode" 
                    value={billAddrZip} 
                    onChange={(e)=>setBillAddrZip(e.target.value)}
                  />
                </div>
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
