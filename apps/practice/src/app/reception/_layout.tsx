import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import AppointmentList from "../components/appointments/AppointmentList";
import PatientMessages from "../components/messages/PatientMessages";
import PatientDetails from "../components/patient/PatientDetails";
import IncomingCall from "../components/phone/IncomingCall";
import TaskList from "../components/tasks/TaskList";
import { AppContext } from "../contexts/AppContext";
import type { LayoutData } from "../interfaces/LayoutData";
import LeftToolbar from "../layout/LeftToolbar";
import MainLayout from "../layout/MainLayout";
import RightToolbar from "../layout/RightToolbar";

export default function ReceptionLayout() {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("AppContext must be used within an AppProvider");
	}

	const { state } = context;
	const [layoutData, setLayoutData] = useState<LayoutData[]>([]);

	return (
		<MainLayout>
			<View className="flex-auto flex-row">
				<View className="w-1/24">
					<LeftToolbar />
				</View>
				<View className="w-4/24 px-1">
					<AppointmentList />
				</View>

				<View className="w-6/24 px-1 flex justify-between">
					{state.selectedAppointment?.id && state.patientId ? (
						<View>
							<PatientDetails />
							<TaskList />
							<IncomingCall />
						</View>
					) : (
						<View>
							<Text>No appointment selected</Text>
						</View>
					)}
				</View>

				<View className="w-12/24 px-1" id="task-display-area">
					{state.patientId ? (
						<PatientMessages />
					) : (
						<View>
							<Text>No patient selected</Text>
						</View>
					)}
				</View>

				<View className="w-1/24">
					<RightToolbar />
				</View>
			</View>
		</MainLayout>
	);
}
