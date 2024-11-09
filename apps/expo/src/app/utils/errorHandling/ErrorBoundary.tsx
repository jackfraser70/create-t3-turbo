import type { ReactNode } from "react";
import React, { Component } from "react";

interface ErrorBoundaryProps {
	fallback: ReactNode;
	children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
