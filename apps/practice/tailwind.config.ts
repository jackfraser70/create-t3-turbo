// @ts-expect-error - no types
import nativewind from "nativewind/preset";
import type { Config } from "tailwindcss";

import baseConfig from "@joyfulwork/tailwind-config/native";

export default {
	content: ["./src/**/*.{ts,tsx}"],
	presets: [baseConfig, nativewind],
	theme: {
		extend: {
			width: {
				// Adds a 24-column grid
				"1/24": "4.1666667%",
				"2/24": "8.3333333%",
				"3/24": "12.5%",
				"4/24": "16.6666667%",
				"5/24": "20.8333333%",
				"6/24": "25%",
				"7/24": "29.1666667%",
				"8/24": "33.3333333%",
				"9/24": "37.5%",
				"10/24": "41.6666667%",
				"11/24": "45.8333333%",
				"12/24": "50%",
				"13/24": "54.1666667%",
				"14/24": "58.3333333%",
				"15/24": "62.5%",
				"16/24": "66.6666667%",
				"17/24": "70.8333333%",
				"18/24": "75%",
				"19/24": "79.1666667%",
				"20/24": "83.3333333%",
				"21/24": "87.5%",
				"22/24": "91.6666667%",
				"23/24": "95.8333333%",
			},
		},
	},
} satisfies Config;
