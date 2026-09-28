import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // jsx-uses-vars and jsx-no-undef are the reason this plugin is here.
      // Without them ESLint cannot see identifiers used only inside JSX, so a
      // component used only in markup looks unused, and — far worse — a typo or
      // a missing import inside JSX passes lint and only crashes at runtime.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // With the JSX rules above, only genuinely unused imports are reported.
      'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    },
  },
])
