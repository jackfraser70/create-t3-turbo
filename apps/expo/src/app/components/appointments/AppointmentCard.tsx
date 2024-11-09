import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const AppointmentCard = ({ name, onPress, isSelected }) => (
	<Pressable
		onPress={onPress}
		style={[styles.appointment, isSelected && styles.selectedAppointment]}
	>
		<Text style={styles.appointmentText}>{name}</Text>
		<Text style={styles.timeText}>Regular Exam</Text>
	</Pressable>
);

const styles = StyleSheet.create({
	appointment: {
		marginBottom: 10,
		padding: 10,
		backgroundColor: "#FBE8F",
		borderRadius: 8,
	},
	selectedAppointment: {
		backgroundColor: "#FFFFFF",
	},
	appointmentText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	timeText: {
		fontSize: 14,
		color: "#555",
	},
});

export default AppointmentCard;
