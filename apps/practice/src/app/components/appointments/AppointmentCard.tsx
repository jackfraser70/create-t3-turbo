import React from "react";
import { Pressable, Text } from "react-native";
import type { Appointment } from "./AppointmentList";

const AppointmentCard = ({
	appointment,
	onPress,
	isSelected,
}: {
	appointment: Appointment;
	onPress: (appointment: Appointment) => void;
	isSelected: boolean;
}) => (
	<Pressable
		onPress={() => onPress(appointment)}
		className="bg-primary rounded-lg p-4 flex-1 my-1"
	>
		<Text className="text-primary-inverse">{appointment.name}</Text>
		<Text className="text-secondary-inverse">{appointment.time}</Text>
	</Pressable>
);

export default AppointmentCard;
