import React, { useState, useEffect } from 'react'

// import styles
import '../styles/Checkout.css';

// import entities
import Plant from '../entities/plant';

// import components
import CheckoutItem from './CheckoutItem';

type Props = {
  cart: Plant[];
}

function ReviewOrder(props:Props):JSX.Element {

  // Delivery date
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const today = new Date();
    // define estimated delivery date to be 10 days from order
    today.setDate(today.getDate() + 10);

    const d = today.getDate();
    const m = today.getMonth() + 1;
    const y = today.getFullYear();

    let month;

    switch (m) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8: 
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10: 
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        month = "Error";
        break;
    }

    setDeliveryDate(month + " " + d + ", " + y);
  });

  return (
    <div>
      <div className="shipment-box bg-light">
        <p>Delivery date: <strong>{deliveryDate}</strong> </p>
        <div>
          { props.cart.map((plant) => <CheckoutItem key={plant.id} name={plant.name} price={plant.price} quantity={plant.quantity} image={plant.image} /> )}
        </div>
      </div>
    </div>
  )
}

export default ReviewOrder
