import React from 'react'

// import styles
import '../styles/Checkout.css';

// import entities
import Plant from '../entities/plant';

// import components
import ReviewOrder from './ReviewOrder';

type Props = {
  orderHistory: (Plant[])[];
}

function OrderHistory(props:Props):JSX.Element {
  return (
    <div >
      { props.orderHistory.map((order, index) => 
        <div key={index} className="mb-4">
          <ReviewOrder order={order} />
        </div>
      )}
    </div>
  )
}

export default OrderHistory;
