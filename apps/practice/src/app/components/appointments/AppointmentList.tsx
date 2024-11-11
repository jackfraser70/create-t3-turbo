import { FlashList } from "@shopify/flash-list";
// import { customAlphabet } from "nanoid/non-secure";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import type { WriteTransaction } from "replicache";
// import { Replicache } from "replicache";
import { useSubscribe } from "replicache-react";
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
interface Appointment {
	id: string;
	time: string;
	name: string;
}

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
	selectedAppointment: string | null;
	setSelectedAppointment: (appointment: string | null) => void;
}

const AppointmentList = ({
	selectedAppointment,
	setSelectedAppointment,
}: AppointmentListProps) => {
	// const { state, setState } = useContext(AppContext);
	const { rep, close } = useReplicache("listID");
	const appointments =
		useSubscribe(rep, async (tx) => {
			const list = await tx
				.scan({ prefix: "appointment/" })
				.entries()
				.toArray();
			return list.map(([key, value]) => {
				if (typeof value === "object" && value !== null) {
					return {
						...value,
						id: key,
					};
				}
				return { id: key }; // Fallback if value is not an object
			}) as Appointment[];
		}) || []; // Fallback to an empty array if undefined

	useEffect(() => {
		// seedData(rep);
		const intervalId = setInterval(async () => {
			if (appointments.length < 5) {
				// set newId to a random id
				const newId = Math.random().toString(36).substring(2, 15);
				const newAppointment = {
					id: newId,
					time: "12pm",
					name: `New Appointment ${newId}`,
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

	const deleteAppointment = async (name: string) => {
		console.log("deleting appointment", name);
		await rep.mutate.deleteItemAsync(name);
	};
	return (
		<View style={styles.appointmentListWrapper}>
			{/* <Text>{JSON.stringify(appointments)}</Text> */}
			<Text style={styles.sidebarTitle}>Today</Text>
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
							name={item.name}
							onPress={() => deleteAppointment(item.id)}
							isSelected={selectedAppointment === item.id}
						/>
					</View>
				)}
				estimatedItemSize={100}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	appointmentListWrapper: {
		flex: 0.3,
		backgroundColor: "white",
	},
	sidebarTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	header: {
		backgroundColor: "#F8D7E4",
		padding: 5,
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default AppointmentList;
