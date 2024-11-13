import { createReplicacheExpoSQLiteKVStore } from "@react-native-replicache/react-native-expo-sqlite";
import React, { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Replicache } from "replicache";
import { mutators } from "../utils/mutators/mutators";
import { useReplicache } from "../utils/use-replicache";
// Define a type for the context value
type UserType = {
	// Define the properties of UserType here
	id: string;
	name: string;
	// Add other properties as needed
};

// Define the correct type for replicache
type ReplicacheType = {
	rep: Replicache<any>;
	close: () => Promise<void>;
};

// Update AppContextType to use ReplicacheType
type AppContextType = {
	user: UserType | null;
	theme: string;
	setState: React.Dispatch<
		React.SetStateAction<{ user: UserType | null; theme: string }>
	>;
	replicache: {
		user: ReplicacheType; // Use the defined ReplicacheType
	};
};

const { rep, close } = useReplicache("tasks");
// Create context with a default value
export const AppContext = createContext<AppContextType>({
	user: null,
	theme: "light",
	setState: () => {}, // Provide a default no-op function
	replicache: {
		user: {
			rep,
			close,
		},
	},
});

// Create a provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState<{ user: UserType | null; theme: string }>({
		user: null,
		theme: "light",
	});

	const [rep, setRep] = useState<Replicache<any> | null>(null);

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

		const unlisten = listen(async () => r.pull());
		setRep(r);

		return () => {
			unlisten();
			void r.close();
		};
	}, []);

	if (!rep) {
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
			value={{ ...state, setState, replicache: { user: { rep, close } } }}
		>
			{children}
		</AppContext.Provider>
	);
};
