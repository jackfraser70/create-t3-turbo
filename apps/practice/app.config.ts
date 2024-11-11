import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "joyful-dental",
	slug: "joyful-dental",
	scheme: "joyful-dental",
	version: "0.1.0",
	orientation: "landscape",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/icon.png",
		resizeMode: "contain",
		backgroundColor: "#1F104A",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: "your.bundle.identifier",
		supportsTablet: true,
	},
	android: {
		package: "your.bundle.identifier",
		adaptiveIcon: {
			foregroundImage: "./assets/icon.png",
			backgroundColor: "#1F104A",
		},
	},
	extra: {
		eas: {
			projectId: "23da2a3f-c951-4ab2-bfcd-be728bc61a6e",
		},
	},
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},
	plugins: ["expo-router"],
	jsEngine: "hermes",
});
