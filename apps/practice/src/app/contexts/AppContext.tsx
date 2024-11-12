import React, { createContext, useState } from "react";

// Define a type for the context value
type UserType = {
	// Define the properties of UserType here
	id: string;
	name: string;
	// Add other properties as needed
};

type AppContextType = {
	user: UserType | null; // Use UserType instead of 'any'
	theme: string;
	setState: React.Dispatch<
		React.SetStateAction<{ user: UserType | null; theme: string }>
	>;
};

// Create context with a default value
export const AppContext = createContext<AppContextType>({
	user: null,
	theme: "light",
	setState: () => {}, // Provide a default no-op function
});

// Create a provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState<{ user: UserType | null; theme: string }>({
		user: null,
		theme: "light",
	});

	return (
		<AppContext.Provider value={{ ...state, setState }}>
			{children}
		</AppContext.Provider>
	);
};
