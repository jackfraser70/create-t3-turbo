import React from "react";
import { StyleSheet, View } from "react-native";
import ToolbarButton from "./ToolbarButton";

export default function LeftToolbar() {
	return (
		<View style={styles.toolbar}>
			<ToolbarButton icon="calendar" />
			<ToolbarButton icon="clipboard-check" />
			<ToolbarButton icon="cog" />
		</View>
	);
}

const styles = StyleSheet.create({
	toolbar: {
		width: 70,
		backgroundColor: "#FFFFFF",
		borderRightWidth: 1,
		borderRightColor: "#F8D7E4",
		padding: 10,
	},
});
