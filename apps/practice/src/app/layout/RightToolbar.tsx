import React from "react";
import { StyleSheet, View } from "react-native";
import ToolbarButton from "./ToolbarButton";

export default function RightToolbar() {
	return (
		<View className="flex-1 flex-col bg-white">
			<ToolbarButton icon="bell" />
			<ToolbarButton icon="user" />
			<ToolbarButton icon="settings" />
		</View>
	);
}
