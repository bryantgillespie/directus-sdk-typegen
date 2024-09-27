module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {
		// You can add custom rules here
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'prettier/prettier': ['error', { useTabs: true }],
	},
};
