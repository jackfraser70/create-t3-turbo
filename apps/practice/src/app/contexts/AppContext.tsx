import React, { createContext, useState } from "react";

// Create context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
	const [state, setState] = useState({
		user: null,
		theme: "light",
		// Add more global state properties here
	});

	return (
		<AppContext.Provider value={{ state, setState }}>
			{children}
		</AppContext.Provider>
	);
};
