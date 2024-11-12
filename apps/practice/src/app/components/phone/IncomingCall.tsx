import { Ionicons } from "@expo/vector-icons"; // Make sure to install this package
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const IncomingCall = () => {
	const [isVisible, setIsVisible] = useState(true);
	const shakeAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const startShake = () => {
			Animated.loop(
				Animated.sequence([
					Animated.timing(shakeAnimation, {
						toValue: 1,
						duration: 50,
						useNativeDriver: true,
					}),
					Animated.timing(shakeAnimation, {
						toValue: -1,
						duration: 50,
						useNativeDriver: true,
					}),
					Animated.timing(shakeAnimation, {
						toValue: 1,
						duration: 50,
						useNativeDriver: true,
					}),
					Animated.timing(shakeAnimation, {
						toValue: -1,
						duration: 50,
						useNativeDriver: true,
					}),
					Animated.timing(shakeAnimation, {
						toValue: 0,
						duration: 50,
						useNativeDriver: true,
					}),
					Animated.delay(2000), // Pause for 2 seconds
				]),
			).start();
		};

		startShake();

		const toggleVisibility = () => {
			setIsVisible((prev) => !prev);
		};

		const getRandomInterval = () => {
			return Math.floor(Math.random() * (120000 - 20000 + 1)) + 20000; // Random between 20s and 120s
		};

		const intervalId = setInterval(() => {
			toggleVisibility();
		}, getRandomInterval());

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [shakeAnimation]);

	const shakeInterpolate = shakeAnimation.interpolate({
		inputRange: [-1, 1],
		outputRange: [-3, 3], // Smaller shake range
	});

	const animatedStyle = {
		transform: [{ translateX: shakeInterpolate }],
	};

	if (!isVisible) {
		return null; // Return null to hide the component
	}

	return (
		<View className="bg-green-500 rounded-lg shadow-lg mb-5">
			<View className="flex items-center mb-4">
				<Animated.View style={animatedStyle}>
					<Ionicons name="call" size={40} color="white" />
				</Animated.View>
			</View>
			<View className="flex items-center mb-6">
				<Text className="text-white text-lg font-bold">Incoming call ...</Text>
				<Text className="text-white text-xl">07714494730</Text>
			</View>
			<View className="flex-row justify-around">
				<TouchableOpacity className="flex-row items-center bg-green-600 px-4 py-2 border border-white rounded-lg">
					<Ionicons
						name="checkmark-circle"
						size={20}
						color="white"
						className="mr-2"
					/>
					<Text className="text-white text-sm font-bold">Answer</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="flex-row items-center bg-gray-600 px-4 py-2 rounded-lg"
					onPress={() => setIsVisible(false)} // Hide the view on press
				>
					<Ionicons
						name="close-circle"
						size={20}
						color="white"
						className="mr-2"
					/>
					<Text className="text-white text-sm font-bold">Reject</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default IncomingCall;
