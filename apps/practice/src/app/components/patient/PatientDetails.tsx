import React from "react";
import { Image, Text, View } from "react-native";

const PatientDetails = () => {
	return (
		<View className="p-4 rounded-lg bg-white shadow-sm">
			<View className="flex-row items-center mb-4">
				<View className="bg-pink-200 rounded-full w-10 h-10 flex items-center justify-center my-3">
					<Text className="text-pink-600 font-bold">MM</Text>
				</View>
				<View>
					<Text className="text-lg font-bold">Michael Mouthwash</Text>
					<Text className="text-gray-500">13 years old Monthly</Text>
				</View>
			</View>

			<View className="bg-pink-100 p-3 rounded-lg mb-4">
				<View className="flex-row items-center">
					<Image
						source={{ uri: "https://via.placeholder.com/40" }}
						className="w-10 h-10 rounded-full mr-3"
					/>
					<View>
						<Text className="text-pink-600 font-bold">10am 15 mins</Text>
						<Text className="text-pink-600">Regular exam with John</Text>
					</View>
				</View>
			</View>

			<View className="flex-row items-center">
				<Text className="text-pink-600 font-bold mr-2">Messages</Text>
				<Text className="text-gray-500">3 hours ago</Text>
			</View>
		</View>
	);
};

export default PatientDetails;
