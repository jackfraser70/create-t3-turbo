module.exports = {
	rules: {
		lint: {
			"no-unused-vars": "error",
			eqeqeq: "warn",
			curly: ["error", "multi-line"],
			"@typescript-eslint/no-unused-imports": "error",
		},
		format: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
		},
	},
};
