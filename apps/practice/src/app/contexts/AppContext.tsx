import { createReplicacheExpoSQLiteKVStore } from "@react-native-replicache/react-native-expo-sqlite";
import React, { createContext, use, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Replicache } from "replicache";
import type { Appointment } from "../components/appointments/AppointmentList";
import { mutators } from "../utils/mutators/mutators";
// Define a type for the context value
type UserType = {
	// Define the properties of UserType here
	id: string;
	name: string;
	// Add other properties as needed
};

// Define a type for the state
type AppState = {
	user: UserType | null;
	theme: string;
	patientId: string;
	appointmentId: string;
	selectedAppointment: Appointment | null;
	replicache: {
		user: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			rep: Replicache<any> | null;
			close: () => Promise<void>;
		};
	};
};

// Update AppContextType to use the new AppState type
type AppContextType = {
	state: AppState;
	setState: React.Dispatch<React.SetStateAction<AppState>>;
};

// const { rep, close } = useReplicache("tasks");
// Create context with a default value

// export const AppContext = createContext<AppContextType>({
// 	state: {
// 		user: null,
// 		theme: "light",
// 		patientId: "1234",
// 	},
// 	setState: () => {}, // Provide a default no-op function
// 	replicache: {
// 		user: {
// 			rep,
// 			close,
// 		},
// 	},
// });

export const AppContext = createContext<AppContextType | null>(null);

// Create a provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	// const [rep, setRep] = useState<Replicache<any> | null>(null);

	const [state, setState] = useState<AppState>({
		user: null,
		theme: "light2",
		patientId: "1234",
		appointmentId: "NON",
		selectedAppointment: null,
		replicache: {
			user: {
				rep: null,
				close: () => Promise.resolve(),
			},
		},
	});

	useEffect(() => {
		console.log("state changed::::", state);
	}, [state]);

	useEffect(() => {
		let userID = "textUser1";
		if (!userID) {
			userID = Math.random().toString(36).substring(2, 15);
			// Cookies.set("userID", userID);
		}

		const listID = userID;
		const useMemory = false;
		const r = new Replicache({
			// See https://doc.replicache.dev/licensing for how to get a license key.
			licenseKey: "l58cd3914a58441f1a01198726ca82729",
			pushURL: `http://127.0.0.1:8080/api/replicache/push?spaceID=${listID}`,
			pullURL: `http://127.0.0.1:8080/api/replicache/pull?spaceID=${listID}`,
			kvStore: useMemory
				? "mem"
				: Platform.OS !== "web"
					? createReplicacheExpoSQLiteKVStore
					: undefined,
			name: listID,
			mutators,
			logLevel: "info",
		});

		// const unlisten = listen(async () => r.pull());
		setState((prevState) => ({
			...prevState,
			replicache: { user: { rep: r, close: () => r.close() } },
		}));

		return () => {
			// unlisten();
			void r.close();
		};
	}, []);

	if (!state.replicache.user.rep) {
		return null;
	}

	// Implements a Replicache poke using Supabase's realtime functionality.
	// See: backend/poke/supabase.ts.
	function listen(onPoke: () => Promise<void>) {
		// const url = getProjectURL();
		// const key = getAPIKey();
		// const supabase = createClient(url, key);
		// const subscriptionChannel = supabase.channel("public:replicache_space");
		// subscriptionChannel
		//   .on(
		// 	"postgres_changes",
		// 	{
		// 	  event: "*",
		// 	  schema: "public",
		// 	  table: "replicache_space",
		// 	},
		// 	() => {
		// 	  void onPoke();
		// 	}
		//   )
		//   .subscribe();
		// return () => {
		//   void supabase.removeChannel(subscriptionChannel);
		// };
	}

	return (
		<AppContext.Provider
			value={{
				state,
				setState,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
