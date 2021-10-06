import React, { useState } from 'react';
import { CartContext } from '.';
import Plant from '../entities/plant';

// eslint-disable-next-line
const CartContextProvider = ({ children }:any) => {
	const initialData:Plant[] = [];
  const [cart, setCart] = useState<Plant[]>(initialData);
	const context = {
		cart,
		setCart,
	};
	return (
		<CartContext.Provider value={ context }>
			{children}
		</CartContext.Provider>
	);
}

export default CartContextProvider;