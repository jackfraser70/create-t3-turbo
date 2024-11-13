import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "joyful-dental",
	slug: "joyful-dental",
	scheme: "joyful-dental",
	version: "0.1.0",
	orientation: "landscape",
	icon: "./assets/joyful_icon.png",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/joyful_icon.png",
		resizeMode: "contain",
		backgroundColor: "#CC2E97",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: "joyful.dental.practice",
		supportsTablet: true,
	},
	android: {
		package: "joyful.dental.practice",
		adaptiveIcon: {
			foregroundImage: "./assets/joyful_icon.png",
			backgroundColor: "#CC2E97",
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
