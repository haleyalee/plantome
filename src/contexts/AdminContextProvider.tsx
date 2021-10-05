import React, { useState } from 'react';
import { AdminContext } from '.';

// eslint-disable-next-line
const AdminContextProvider = ({ children }:any) => {
	const initialData = false;
  const [isAdmin, setIsAdmin] = useState(initialData);
	const context = {
		isAdmin,
		setIsAdmin,
	};
	return (
		<AdminContext.Provider value={ context }>
			{children}
		</AdminContext.Provider>
	);
}

export default AdminContextProvider;