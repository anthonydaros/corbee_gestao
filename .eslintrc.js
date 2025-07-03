module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'plugin:n8n-nodes-base/community',
	],
	env: {
		node: true,
		es6: true,
	},
	rules: {
		// Remove typescript-eslint rules for now since plugin isn't installed
	},
};