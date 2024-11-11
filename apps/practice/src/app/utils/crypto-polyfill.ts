import * as Crypto from "expo-crypto";

declare const global: {
	crypto: {
		getRandomValues(array: Uint8Array): Uint8Array;
		randomUUID(): string;
	};
};

export function bootCryptoPolyfill() {
	console.log("bootCryptoPolyfill");
	global.crypto = {
		getRandomValues(array: Uint8Array) {
			return Crypto.getRandomValues(array);
		},
		randomUUID() {
			return Crypto.randomUUID();
		},
	};
}
