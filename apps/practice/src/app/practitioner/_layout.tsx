import React, { useEffect, useState } from "react";
import type { LayoutData } from "../interfaces/LayoutData";
import RecursiveComponent from "../layout/RecursiveComponent";

export default function PractitionerLayout() {
	const [layoutData, setLayoutData] = useState<LayoutData[]>([]);
	useEffect(() => {
		async function loadData() {
			setLayoutData([
				{
					name: "container",
					component: "AppointmentList",
					dark: {
						props: {
							style: {
								backgroundColor: "#000000",
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
							},
						},
					},
				},
			]);
		}

		loadData();
	}, []);

	return <RecursiveComponent data={layoutData} />;
}
