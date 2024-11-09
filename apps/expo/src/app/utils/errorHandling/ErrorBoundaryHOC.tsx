import type React from "react";
import { Text } from "react-native";
import ErrorBoundary from "./ErrorBoundary";

const withErrorBoundary = (
	WrappedComponent: React.ComponentType<unknown>,
	fallback = <Text>Something went wrong.</Text>,
) => {
	return (props: React.ComponentProps<typeof WrappedComponent>) => (
		<ErrorBoundary fallback={fallback}>
			<WrappedComponent {...(props as object)} />
		</ErrorBoundary>
	);
};

export default withErrorBoundary;
