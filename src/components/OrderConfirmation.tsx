import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import ReviewOrder from './ReviewOrder';

// import Plant from '../entities/plant';

// type Props = {
//   cart: Plant[],
//   signedIn: boolean,
// }

// eslint-disable-next-line
function OrderConfirmation(props:any):JSX.Element {

  const [cart] = useState(props.cart);

  useEffect(()=> {
    if (!props.signedIn) {
      const orderHistory = document.getElementById("order-history");
      orderHistory?.setAttribute('disabled', '');
    }
  });

  const switchToOrderHistory = () => {
    props.history.push('/account');
  }

  return (
    <div className="container py-5">
      <h2 className="pb-3">Order Confirmation</h2>
      <div className="alert alert-success mb-5" role="alert">
        Your order number <a id="order-history" role="button" onClick={switchToOrderHistory}><u>#100235</u></a> has been successfully placed!
      </div>
      <div>
        <h5 className="mb-4">Here&apos;s what to look forward to:</h5>
        <ReviewOrder cart={cart} />
      </div>
    </div>
  )
}

export default withRouter(OrderConfirmation);
