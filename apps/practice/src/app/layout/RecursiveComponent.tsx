import React from "react";
import type { LayoutData } from "../interfaces/LayoutData";
import { ComponentMapping } from "./ComponentMapping";

type RecursiveComponentProps = {
	data: Array<LayoutData>;
	// theme: "dark" | "light";
};

const RecursiveComponent = ({ data }: RecursiveComponentProps) => {
	for (const item of data) {
		item.id = Math.random().toString(36).substring(2, 15);
	}
	return (
		<>
			{data.map((item, index) => {
				const Component = ComponentMapping[item.component];
				if (!Component) {
					console.error(`Component ${item.component} not found in mapping.`);
					return null;
				}
				return (
					<Component key={item.id}>
						{item.children && <RecursiveComponent data={item.children} />}
					</Component>
				);
			})}
		</>
	);
};

export default RecursiveComponent;
