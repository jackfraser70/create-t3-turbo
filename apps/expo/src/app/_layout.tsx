import "@bacons/text-decoder/install";

import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { TRPCProvider } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	return (
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
	);
}
