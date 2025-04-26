const js = require('@eslint/js')
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')
const prettier = require('eslint-config-prettier')


module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  prettier,
]
