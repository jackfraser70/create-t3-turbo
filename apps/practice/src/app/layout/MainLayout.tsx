import type { ReactNode } from "react";
import React from "react";
import { StyleSheet, View } from "react-native";

import TopBar from "./TopBar";

interface MainLayoutProps {
	children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<View className="flex-1">
			<TopBar />
			<View className="flex-1">
				<View className="flex-1 flex-row">{children}</View>
			</View>
		</View>
	);
}
