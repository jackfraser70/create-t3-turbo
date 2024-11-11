import { Text, TouchableOpacity, View } from "react-native";
import AppointmentCard from "../components/appointments/AppointmentCard";
import AppointmentList from "../components/appointments/AppointmentList";
import MainLayout from "./MainLayout";

export const ComponentMapping = {
	View,
	Text,
	TouchableOpacity,
	MainLayout,
	AppointmentCard,
	AppointmentList,
} as const;
