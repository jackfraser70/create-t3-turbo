import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	LayoutAnimation,
	Platform,
	Text,
	TouchableOpacity,
	UIManager,
	View,
} from "react-native";
import type { ReadTransaction } from "replicache";
import { useSubscribe } from "replicache-react";
import { AppContext } from "~/app/contexts/AppContext";
import { getTasksPath } from "~/app/utils/mutators/mutators";
import type { Task } from "~/app/utils/mutators/tasks";
import { listItems } from "~/utils/replicacheItems";
import type { Appointment } from "../appointments/AppointmentList";

// Enable LayoutAnimation on Android
if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define the type for your context
interface AppContextType {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	replicache: { user: { rep: any } }; // Adjust the type as needed
	state: { patientId: string }; // Adjust the type as needed
}

const TaskList = () => {
	const [currentPatientId, setCurrentPatientId] = useState("NO_PATIENT_ID");

	const context = useContext(AppContext); // Allow null
	if (!context) {
		throw new Error("AppContext is null");
	}

	const { state, setState } = context;
	const selectedAppointment = state.selectedAppointment;
	const rep = state.replicache.user.rep;
	const pathToTasks = getTasksPath(
		currentPatientId,
		selectedAppointment?.id || "default-id",
	);
	console.log("pathToTasks>>>", pathToTasks);
	const tasks = useSubscribe(rep, (tx) => listItems<Task>(tx, pathToTasks), {
		default: [],
		dependencies: [currentPatientId, selectedAppointment?.id],
	});

	useEffect(() => {
		if (state.patientId !== currentPatientId) {
			// when patient changes, clear the tasks
			console.log("patientId  changed", state.patientId);
			setCurrentPatientId(state.patientId);
			state.replicache.user.rep?.pull();
		}
	}, [state, currentPatientId]);

	const handleNewTask = (name: string) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		if (rep.mutate) {
			if (selectedAppointment) {
				const newTask: Task = {
					id: Math.random().toString(36).substring(2, 15),
					name,
					dueDate: new Date().toISOString(),
					patientId: state.patientId,
					appointmentId: selectedAppointment.id,
				};
				rep.mutate.createTask(newTask);
				console.log("new task created", newTask);
			} else {
				console.error("No appointment selected");
			}
		} else {
			console.error("Mutation object is undefined");
		}
	};

	const handleDeleteTask = (task: Task) => {
		console.log("deleting task", task);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		rep.mutate.deleteTasks([task]);
	};

	const handleDeleteAppointment = (id: string) => {
		console.log("deleting appointment", id);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		rep.mutate.deleteItemAsync(`appointment/${state.selectedAppointment?.id}`);
		// delete all tasks for the appointment
		rep.mutate.deleteTasks(tasks);

		setState((prevState) => {
			const newState = {
				...prevState,
				patientId: null,
				selectedAppointment: null,
			};
			return newState;
		});
	};

	return (
		<View className="p-4 my-5">
			<Button
				title="Delete Appointment"
				onPress={() => handleDeleteAppointment(state.appointmentId)}
			/>
			<View className="flex-row justify-between  mb-2">
				<Text className="text-pink-600 font-bold">Tasks</Text>
			</View>

			<View className="h-full">
				<Button
					title={`New Task for ${state.patientId}`}
					onPress={() => handleNewTask(`New Task for ${state.patientId}`)}
				/>
				<FlashList
					data={tasks}
					keyExtractor={(item: Task, index: number) => {
						if (!item.id) {
							console.warn("Missing id for item", item);
							return `missing-id-${index}`; // Use index as part of the key if id is missing
						}
						return item.id.toString();
					}}
					renderItem={({ item }: { item: Task }) => (
						<View>
							<TouchableOpacity onPress={() => handleDeleteTask(item)}>
								<View key={item.id}>
									<Ionicons
										name="radio-button-off"
										size={24}
										color="pink"
										className="mr-2"
									/>
									<View>
										<Text className="text-pink-600 font-bold">{item.name}</Text>
										<Text className="text-gray-500">{item.dueDate}</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					)}
					estimatedItemSize={20} // Adjust this value based on your item size
				/>
			</View>
		</View>
	);
};

export default TaskList;
