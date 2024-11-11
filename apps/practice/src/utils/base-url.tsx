// import Constants from 'expo-constants';

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
	// const debuggerHost = Constants.expoConfig?.hostUri;

	// if (!debuggerHost) {
	//   console.warn(
	//     'debuggerHost is undefined. Please check your Expo configuration.'
	//   );
	//   throw new Error(
	//     'Failed to get debuggerHost. Please point to your production server.'
	//   );
	// }

	// const localhost = debuggerHost.split(':')[0];

	// if (!localhost) {
	//   console.warn('localhost could not be determined from debuggerHost.');
	//   throw new Error(
	//     'Failed to get localhost. Please point to your production server.'
	//   );
	// }

	return "http://localhost:8081";
};
