const js = require('@eslint/js')
const reactHooksPlugin = require('eslint-plugin-react-hooks')
const prettier = require('eslint-config-prettier')
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactNativePlugin = require('eslint-plugin-react-native');


module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactNativePlugin.configs.all.rules,
      'react-hooks/exhaustive-deps': 'off',
      'react-native/sort-styles': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      "react/react-in-jsx-scope": "off"
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // Note: there should be no other properties in this object
    ignores: ["sample/**", "demo/*", "**/lib/**", "**/__tests__/**", "**/dist/**", "**/*.config.js"],
  },
  prettier,
]
