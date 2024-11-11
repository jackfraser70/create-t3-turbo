import { createReplicacheExpoSQLiteKVStore } from "@react-native-replicache/react-native-expo-sqlite";
import React from "react";
import { Platform } from "react-native";
import EventSource from "react-native-sse";
import { Replicache, dropAllDatabases } from "replicache";
import { mutators } from "./mutators/mutators";
export function useReplicache(listID: string) {
	// See https://doc.replicache.dev/licensing for how to get a license key.
	const licenseKey = "l58cd3914a58441f1a01198726ca82729";
	if (!licenseKey) {
		throw new Error("Missing VITE_REPLICACHE_LICENSE_KEY");
	}

	const rep = React.useMemo(
		() =>
			new Replicache({
				licenseKey,
				pushURL: `http://127.0.0.1:8080/api/replicache/push?spaceID=${listID}`,
				pullURL: `http://127.0.0.1:8080/api/replicache/pull?spaceID=${listID}`,
				...(Platform.OS !== "web" && {
					kvStore: createReplicacheExpoSQLiteKVStore,
				}),
				name: listID,
				mutators,
				// logLevel: "debug",
			}),
		[listID],
	);

	const close = React.useCallback(async () => {
		await rep.close();
		await dropAllDatabases({
			...(Platform.OS !== "web" && {
				kvStore: createReplicacheExpoSQLiteKVStore,
			}),
		});
	}, [rep]);

	React.useEffect(() => {
		// Note: React Native doesn't support SSE; this is just a polyfill.
		// You probably want to setup a WebSocket connection via Pusher.
		const ev = new EventSource(
			`http://127.0.0.1:8080/api/replicache/poke?spaceID=${listID}`,
			{
				headers: {
					withCredentials: true,
				},
			},
		);

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		ev.addEventListener("message", async (evt: any) => {
			if (evt.type !== "message") return;
			if (evt.data === "poke") {
				await rep.pull();
			}
		});

		return () => {
			ev.close();
		};
	}, [listID, rep]);

	return { rep, close };
}
