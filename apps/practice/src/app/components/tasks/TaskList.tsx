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
import type { Task } from "~/app/utils/mutators/tasks";
import { listItems } from "~/utils/replicacheItems";

// Enable LayoutAnimation on Android
if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define the type for your context
interface AppContextType {
	replicache: { user: { rep: any } }; // Adjust the type as needed
	state: { patientId: string }; // Adjust the type as needed
}

const TaskList = () => {
	const [currentPatientId, setCurrentPatientId] = useState("NO_PATIENT_ID");
	const context = useContext(AppContext); // Allow null
	if (!context) {
		throw new Error("AppContext is null");
	}
	const { state } = context;

	const rep = state.replicache.user.rep;
	const tasks = useSubscribe(
		rep,
		(tx) => listItems<Task>(tx, `patient/${currentPatientId}/task/`),
		{ default: [], dependencies: [currentPatientId] },
	);

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
			const newTask: Task = {
				id: Math.random().toString(36).substring(2, 15),
				name,
				dueDate: new Date().toISOString(),
				patientId: state.patientId,
			};
			rep.mutate.createTask(newTask);
			console.log("new task created", newTask);
		} else {
			console.error("Mutation object is undefined");
		}
	};

	const handleDeleteTask = (id: string) => {
		console.log("deleting task", id);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		rep.mutate.deleteItemAsync(`patient/${state.patientId}/task/${id}`);
	};

	return (
		<View className="p-4 my-5">
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
							<TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
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
