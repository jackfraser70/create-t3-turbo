import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppointmentList from "../components/appointments/AppointmentList";
import type { LayoutData } from "../interfaces/LayoutData";
import MainLayout from "../layout/MainLayout";
import RecursiveComponent from "../layout/RecursiveComponent";

export default function ReceptionLayout() {
	const [layoutData, setLayoutData] = useState<LayoutData[]>([]);
	const [selectedAppointment, setSelectedAppointment] = useState(null);

	useEffect(() => {
		setLayoutData([
			{
				name: "mainLayout",
				component: "MainLayout",
				props: {},

				children: [
					{
						name: "appointmentList",
						component: "AppointmentList",
						props: {
							selectedAppointment,
							setSelectedAppointment,
						},
					},
				],
				// 	// {
				// 	// 	name: "root",
				// 	// 	component: "View",
				// 	// 	props: { style: styles.root },
				// 	// 	children: [
				// 	// 		{
				// 	// 			name: "container",
				// 	// 			component: "View",
				// 	// 			props: { style: styles.container },
				// 	// 			children: [
				// 	// 				{
				// 	// 					name: "appointmentList",
				// 	// 					component: "AppointmentList",
				// 	// 					props: {
				// 	// 						selectedAppointment,
				// 	// 						setSelectedAppointment,
				// 	// 					},
				// 	// 				},
				// 	// 				{
				// 	// 					name: "header",
				// 	// 					component: "View",
				// 	// 					props: { style: styles.header },
				// 	// 					children: [
				// 	// 						{
				// 	// 							name: "headerText",
				// 	// 							component: "Text",
				// 	// 							props: {
				// 	// 								style: styles.headerText,
				// 	// 								children: selectedAppointment,
				// 	// 							},
				// 	// 						},
				// 	// 						{
				// 	// 							name: "subHeaderText",
				// 	// 							component: "Text",
				// 	// 							props: {
				// 	// 								style: styles.subHeaderText,
				// 	// 								children: `Details for ${selectedAppointment}`,
				// 	// 							},
				// 	// 						},
				// 	// 					],
				// 	// 				},
				// 	// 				{
				// 	// 					name: "details",
				// 	// 					component: "View",
				// 	// 					props: { style: styles.details },
				// 	// 					children: [
				// 	// 						{
				// 	// 							name: "detailsText1",
				// 	// 							component: "Text",
				// 	// 							props: {
				// 	// 								style: styles.detailsText,
				// 	// 								children: "10am 15 mins",
				// 	// 							},
				// 	// 						},
				// 	// 						{
				// 	// 							name: "detailsText2",
				// 	// 							component: "Text",
				// 	// 							props: {
				// 	// 								style: styles.detailsText,
				// 	// 								children: "Regular exam with John",
				// 	// 							},
				// 	// 						},
				// 	// 					],
				// 	// 				},
				// 	// 			],
				// 	// 		},
				// 	// 	],
				// 	// },
				// ],
			},
		]);
	}, [selectedAppointment]);

	return <RecursiveComponent data={layoutData} />;
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#FDEFF4",
	},
	mainContent: {
		flex: 1,
		padding: 20,
	},
	subHeaderText: {
		fontSize: 18,
		color: "#777",
	},
	details: {
		marginBottom: 20,
	},
	detailsText: {
		fontSize: 16,
		color: "#555",
	},
	placeholderText: {
		fontSize: 18,
		color: "#777",
		textAlign: "center",
		marginTop: 20,
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
