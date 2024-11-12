import React, { useState } from "react";
import { View } from "react-native";
import AppointmentList from "../components/appointments/AppointmentList";
import PatientMessages from "../components/messages/PatientMessages";
import PatientDetails from "../components/patient/PatientDetails";
import IncomingCall from "../components/phone/IncomingCall";
import TaskList from "../components/tasks/TaskList";
import type { LayoutData } from "../interfaces/LayoutData";
import LeftToolbar from "../layout/LeftToolbar";
import MainLayout from "../layout/MainLayout";
import RightToolbar from "../layout/RightToolbar";

export default function ReceptionLayout() {
	const [layoutData, setLayoutData] = useState<LayoutData[]>([]);
	const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
		null,
	);

	return (
		<MainLayout>
			<View className="flex-auto flex-row">
				<View className="w-1/24">
					<LeftToolbar />
				</View>
				<View className="w-4/24 px-1">
					<AppointmentList
						selectedAppointment={selectedAppointment}
						setSelectedAppointment={setSelectedAppointment}
					/>
				</View>

				<View className="w-6/24 px-1 flex justify-between">
					<View>
						<PatientDetails />
						<TaskList />
						<IncomingCall />
					</View>
				</View>

				<View className="w-12/24 px-1" id="task-display-area">
					<PatientMessages />
				</View>

				<View className="w-1/24">
					<RightToolbar />
				</View>
			</View>
		</MainLayout>
	);
}
