import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	type MakeMutators,
	Replicache,
	type WriteTransaction,
} from "replicache";
import { useSubscribe } from "replicache-react";
import type { Task } from "~/app/utils/mutators/tasks";

// Define the mutators type
type Mutators = MakeMutators<{
	createNewTask: (tx: WriteTransaction, task: Task) => Promise<void>;
}>;

const TaskList = () => {
	const listID = "tasks";
	const rep = useRef<Replicache<Mutators> | null>(null);

	useEffect(() => {
		if (!rep.current) {
			console.log(">>>>>>>>>>>>>>>> creating rep");
			rep.current = new Replicache<Mutators>({
				licenseKey: "l58cd3914a58441f1a01198726ca82729",
				pushURL: `http://127.0.0.1:8080/api/replicache/push?spaceID=${listID}`,
				pullURL: `http://127.0.0.1:8080/api/replicache/pull?spaceID=${listID}`,
				kvStore: "mem",
				name: "tasks",
				mutators: {
					async createNewTask(tx: WriteTransaction, task: Task) {
						console.log("createTaskN____", task);
						await tx.set(`task/${task.id}`, { ...task });
					},
				},
				// logLevel: "debug",
			});
		}
	}, []);

	const tasks =
		useSubscribe(rep.current, async (tx) => {
			const list = await tx.scan({ prefix: "task/" }).entries().toArray();

			if (list.length === 0) {
				console.log("TASK  list 0");
				return []; // Return an empty array if no tasks are found
			}
			return list.map(([key, value]) => {
				if (typeof value === "object" && value !== null) {
					console.log("return ", {
						...value,
						id: key,
					});
					return {
						...value,
						id: key,
					};
				}
				return { id: key }; // Fallback if value is not an object
			}) as Task[];
		}) || []; // Fallback to an empty array if undefined

	// create 5 items if no in the list
	useEffect(() => {
		if (tasks.length === 0) {
			console.log(">>>>>>>>>>>>>>>> creating tasks");
			for (let i = 0; i < 5; i++) {
				rep.current?.mutate.createNewTask({
					id: i.toString(),
					name: `Task ${i}`,
					dueDate: new Date().toISOString(),
				});
			}
		}
	}, [tasks]);
	return (
		<View className="p-4 bg-white rounded-lg shadow-sm my-5 h-3/6 ">
			<View className="flex-row justify-between  mb-2">
				<Text className="text-pink-600 font-bold">Tasks</Text>
			</View>

			<View className="h-full">
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
						</View>
					)}
					estimatedItemSize={20} // Adjust this value based on your item size
				/>
			</View>
		</View>
	);
};

export default TaskList;
