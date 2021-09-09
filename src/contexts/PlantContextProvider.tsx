import React, { useState } from 'react';
import AppContext from '.';

const PlantContextProvider = ({ children }:any) => {
	const [plants, setPlants] = useState<any>()
	const context = {
		plants,
		setPlants,
	};
	return (
		<AppContext.Provider value={ context }>
			{children}
		</AppContext.Provider>
	);
}

export default PlantContextProvider;