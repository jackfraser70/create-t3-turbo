import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const AppointmentCard = ({ name, onPress, isSelected }) => (
	<Pressable
		onPress={onPress}
		className="bg-primary rounded-lg p-4 flex-1 my-1"
	>
		<Text className="text-primary-inverse">{name}</Text>
		<Text className="text-secondary-inverse">Regular Exam</Text>
	</Pressable>
);

export default AppointmentCard;
