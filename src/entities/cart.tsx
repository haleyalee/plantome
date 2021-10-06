import Plant from './plant';

class Cart {
  constructor(public id: string, public cart: Plant[], public orderHistory: (Plant[])[] ) { }
}

export default Cart;