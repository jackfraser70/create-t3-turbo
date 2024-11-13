import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useContext } from "react";
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

// Enable LayoutAnimation on Android
if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export async function listTasks(tx: ReadTransaction) {
	const tasks = await tx.scan<Task>({ prefix: "task/" }).values().toArray();
	return tasks.sort(
		(a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
	);
}

const TaskList = () => {
	const { replicache } = useContext(AppContext);
	const rep = replicache.user.rep;

	const tasks = useSubscribe(rep, listTasks, { default: [] });

	const handleNewTask = (name: string) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		if (rep.mutate) {
			rep.mutate.createTask({
				id: Math.random().toString(36).substring(2, 15),
				name,
				dueDate: new Date().toISOString(),
			});
		} else {
			console.error("Mutation object is undefined");
		}
	};

	const handleDeleteTask = (id: string) => {
		console.log("deleting task", id);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		rep.mutate.deleteItemAsync(`task/${id}`);
	};

	return (
		<View className="p-4 my-5">
			<View className="flex-row justify-between  mb-2">
				<Text className="text-pink-600 font-bold">Tasks</Text>
			</View>

			<View className="h-full">
				<Button title="New Task" onPress={() => handleNewTask("New Task 3")} />
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
