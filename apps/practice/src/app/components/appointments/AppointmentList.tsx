import { FlashList } from "@shopify/flash-list";
// import { customAlphabet } from "nanoid/non-secure";
import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ReadTransaction } from "replicache";
// import type { WriteTransaction } from "replicache";
// import { Replicache } from "replicache";
import { useSubscribe } from "replicache-react";
import { AppContext } from "~/app/contexts/AppContext";
import type { BaseTypeRep } from "~/app/utils/mutators/baseTypesRep";
import { listItems } from "~/utils/replicacheItems";
import { useReplicache } from "../../utils/use-replicache";
import AppointmentCard from "./AppointmentCard";
// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
// const rep = new Replicache({
// 	name: "appointments",
// 	licenseKey: "l58cd3914a58441f1a01198726ca82729",
// 	mutators: {
// 		async createAppointment(
// 			tx: WriteTransaction,
// 			{ id, time, name }: { id: string; time: string; name: string },
// 		) {
// 			await tx.put(`appointment/${id}`, { time, name });
// 		},
// 	},
// 	pushURL: "/api/replicache/push",
// 	pullURL: "/api/replicache/pull",
// 	logLevel: "debug",
// });

// Define the type for an appointment

// const seedData = async (rep: any) => {
// 	// const dummyAppointments = [
// 	// 	{
// 	// 		id: Math.random().toString(36).substring(2, 15),
// 	// 		time: "10am",
// 	// 		name: "Tom Clean2",
// 	// 	},
// 	// 	{
// 	// 		id: Math.random().toString(36).substring(2, 15),
// 	// 		time: "10am",
// 	// 		name: "Michael Mouthwash",
// 	// 	},
// 	// 	{
// 	// 		id: Math.random().toString(36).substring(2, 15),
// 	// 		time: "11am",
// 	// 		name: "Molly Molar",
// 	// 	},
// 	// 	{
// 	// 		id: Math.random().toString(36).substring(2, 15),
// 	// 		time: "11am",
// 	// 		name: "Peter Pulp",
// 	// 	},
// 	// ];
// 	// for (const appointment of dummyAppointments) {
// 	// 	await rep.mutate.createAppointment(appointment);
// 	// }
// };
interface AppointmentListProps {
	selectedAppointment: Appointment | null;
	setSelectedAppointment: (appointment: Appointment | null) => void;
}

export type Appointment = BaseTypeRep & {
	time: string;
	name: string;
};

const AppointmentList = ({
	selectedAppointment,
	setSelectedAppointment,
}: AppointmentListProps) => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("AppContext must be used within an AppProvider");
	}

	const { setState, state } = context;

	const rep = state.replicache.user.rep;

	// Use the generic listItems function with the "appointment/" prefix
	const appointments = useSubscribe(
		rep,
		(tx) => listItems<Appointment>(tx, "appointment/"),
		{ default: [] },
	);

	useEffect(() => {
		// seedData(rep);
		const intervalId = setInterval(async () => {
			if (appointments.length < 10) {
				// set newId to a random id
				const newId = Math.random().toString(36).substring(2, 15);
				const newAppointment = {
					id: newId,
					time: "12pm",
					name: `New Appointment ${newId}`,
					patientId: Math.random().toString(36).substring(2, 15),
				};
				console.log("newAppointment", newAppointment);
				await rep.mutate.createAppointment(newAppointment);
			}
		}, 5000);
		return () => {
			clearInterval(intervalId);
		};
	}, [appointments, rep]);

	// const groupedAppointments = (appointments || []).reduce(
	// 	(acc, { id, time, name }) => {
	// 		if (!acc[time]) acc[time] = { id, title: time, data: [] };
	// 		acc[time].data.push({ id, name });
	// 		return acc;
	// 	},
	// 	{} as Record<string, { id: string; title: string; data: string[] }>,
	// );

	//close the replicache when the component unmounts
	// useEffect(() => {
	// 	return () => {
	// 		close();
	// 	};
	// }, [close]);

	const deleteAppointment = async (appointment: Appointment) => {
		console.log("deleting appointment", appointment);
		await rep.mutate.deleteItemAsync(`appointment/${appointment.id}`);
	};
	const [refreshing, setRefreshing] = React.useState(false);

	// SET THE patientId FROM THE APPOINTMENT when the appointment is selected
	useEffect(() => {
		if (selectedAppointment) {
			console.log(
				"selectedAppointment psssatient id",
				selectedAppointment.patientId,
			);
			setState((prevState) => {
				console.log("prevState", prevState);
				const newState = {
					...prevState,
					patientId: selectedAppointment.patientId,
				};
				console.log("Updating state with", newState);
				return newState;
			});
		}
	}, [selectedAppointment, setState]);

	useEffect(() => {
		console.log("patientId changed::::", state.patientId);
	}, [state]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		// Simulate a network request or any async operation
		setTimeout(() => {
			// Update your data here
			setRefreshing(false);
		}, 500);
	}, []);
	return (
		<View className="flex-1">
			{/* <Text>{JSON.stringify(appointments)}</Text> */}
			<Text className="text-primary text-2xl font-bold">
				Today - {state.patientId} - {state.theme}
			</Text>
			<FlashList
				data={appointments} // Ensure appointments is an array of Appointment objects
				keyExtractor={(item: Appointment, index: number) => {
					if (!item.id) {
						console.warn("Missing id for item", item);
						return `missing-id-${index}`; // Use index as part of the key if id is missing
					}
					return item.id.toString();
				}}
				renderItem={({ item }: { item: Appointment }) => (
					<View>
						<AppointmentCard
							key={item.id}
							appointment={item}
							onPress={() => setSelectedAppointment(item)}
							isSelected={selectedAppointment?.id === item.id}
						/>
					</View>
				)}
				estimatedItemSize={100}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
				refreshing={refreshing} // Control the refreshing state
				onRefresh={onRefresh} // Handle the refresh action
			/>
		</View>
	);
};

export default AppointmentList;
