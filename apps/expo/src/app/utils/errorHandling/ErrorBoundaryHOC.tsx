import React from 'react';
import { Text } from 'react-native';
import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = (
  WrappedComponent: React.ComponentType<any>,
  fallback = <Text>Something went wrong.</Text>
) => {
  return (props) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;
