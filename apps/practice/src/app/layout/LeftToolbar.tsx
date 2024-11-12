import React from "react";
import { StyleSheet, View } from "react-native";
import ToolbarButton from "./ToolbarButton";

export default function LeftToolbar() {
	return (
		<View className="flex-1 flex-col bg-white">
			<ToolbarButton icon="calendar" />
			<ToolbarButton icon="clipboard-check" />
			<ToolbarButton icon="cog" />
		</View>
	);
}
