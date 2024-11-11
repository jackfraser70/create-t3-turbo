import { render } from "@testing-library/react-native";
import React from "react";
import HomeScreen, { CustomText } from "../src/app/homeScreenTest";
describe("<HomeScreen />", () => {
	test("Text renders correctly on HomeScreen", () => {
		const { getByText } = render(<HomeScreen />);

		getByText("Welcome!");
	});
	test("CustomText renders correctly", () => {
		const tree = render(<CustomText>Some text</CustomText>).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
