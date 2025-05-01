import js from '@eslint/js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';

export default [
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
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": 'off'
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
];
