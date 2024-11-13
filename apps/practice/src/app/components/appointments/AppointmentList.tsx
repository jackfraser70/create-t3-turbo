import { FlashList } from "@shopify/flash-list";
// import { customAlphabet } from "nanoid/non-secure";
import React, { useEffect, useContext, useState, useRef } from "react";
import { Text, View } from "react-native";
import { useSubscribe } from "replicache-react";
import { AppContext } from "~/app/contexts/AppContext";
import type { BaseTypeRep } from "~/app/utils/mutators/baseTypesRep";
import { listItems } from "~/utils/replicacheItems";
import AppointmentCard from "./AppointmentCard";

export type Appointment = BaseTypeRep & {
	time: string;
	name: string;
};

const AppointmentList = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("AppContext must be used within an AppProvider");
	}

	const { setState, state } = context;

	const [currentSelectedAppointmentId, setCurrentSelectedAppointmentId] =
		useState<string | null>(null);

	const rep = state.replicache.user.rep;

	const selectedAppointment = state.selectedAppointment;
	const setSelectedAppointment = (appointment: Appointment | null) => {
		setState((prevState) => ({
			...prevState,
			selectedAppointment: appointment,
		}));
	};

	// Use the generic listItems function with the "appointment/" prefix
	const appointments = useSubscribe(
		rep,
		(tx) => listItems<Appointment>(tx, "appointment/"),
		{ default: [], dependencies: [state.patientId] },
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
			setCurrentSelectedAppointmentId(selectedAppointment.id);
			console.log("selectedAppointment fredddddd id", selectedAppointment);
			setState((prevState) => {
				const newState = {
					...prevState,
					patientId: selectedAppointment.patientId,
					selectedAppointment: selectedAppointment,
				};
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
			<Text className="text-primary text-2xl font-bold">Today</Text>
			<FlashList
				data={appointments}
				// Ensure appointments is an array of Appointment objects
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
							isSelected={currentSelectedAppointmentId === item.id}
						/>
					</View>
				)}
				estimatedItemSize={100}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
				refreshing={refreshing} // Control the refreshing state
				onRefresh={onRefresh} // Handle the refresh action
				extraData={{ currentSelectedAppointmentId }}
			/>
		</View>
	);
};

export default AppointmentList;
