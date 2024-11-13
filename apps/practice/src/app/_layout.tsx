import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { TRPCProvider } from "~/utils/api";
import "expo-dev-client";
import "../styles.css";
import { AppProvider } from "./contexts/AppContext";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	return (
		<AppProvider>
			<TRPCProvider>
				{/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
				<Slot
					screenOptions={{
						contentStyle: {
							flex: 1,
							borderColor: "green",
							borderWidth: 4,
							backgroundColor: colorScheme === "dark" ? "#CC2E97" : "#FFFFFF",
						},
					}}
				/>
				{/* <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#CC2E97',
          },

          contentStyle: {
            flex: 1,
            borderColor: 'green',
            borderWidth: 4,
            backgroundColor: colorScheme === 'dark' ? '#CC2E97' : '#FFFFFF',
          },
        }}
      /> */}
				<StatusBar />
			</TRPCProvider>
		</AppProvider>
	);
}
