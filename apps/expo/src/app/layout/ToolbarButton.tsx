import React from "react";
import { StyleSheet, View } from "react-native";

export default function ToolbarButton({ icon }) {
	return (
		<View style={styles.button}>{/* Render icon based on the prop */}</View>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 42,
		height: 42,
		backgroundColor: "#F8D7E4",
		borderRadius: 21,
		marginBottom: 16,
		justifyContent: "center",
		alignItems: "center",
	},
});
