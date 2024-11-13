import React, { useState } from "react";
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
}) => {
	const [isPressed, setIsPressed] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Pressable
			onPress={() => onPress(appointment)}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			className={`rounded-lg p-4 flex-1 my-1 
				${isSelected ? "bg-primary border-2 border-primary-inverse" : ""} 
				${isPressed ? "bg-pressed opacity-70 border-2 border-primary-inverse" : ""} 
				${isHovered ? "bg-hover" : ""}`}
		>
			<Text className="text-primary-inverse">{appointment.name}</Text>
			<Text className="text-secondary-inverse">{appointment.time}</Text>
		</Pressable>
	);
};

export default AppointmentCard;
