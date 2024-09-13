// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import panda from '@pandacss/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default tseslint.config({
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  ignores: ['**/dist/**', '**/node_modules/**', 'styled-system/**'],
  extends: [
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
    tseslint.configs.eslintRecommended,
    ...tseslint.configs.recommended,
    // @ts-expect-error eslint-plugin-react-hooks is not typed correctly
    ...compat.config(reactHooks.configs.recommended),
  ],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2020,
    },
  },
  plugins: {
    '@pandacss': panda,
    'simple-import-sort': simpleImportSort,
    'react-refresh': reactRefresh,
    prettier: eslintPluginPrettier,
  },
  // @ts-expect-error - incorrect types
  rules: {
    ...panda.configs.recommended.rules,
    '@pandacss/no-debug': 'off',
    '@pandacss/no-margin-properties': 'warn',
    '@pandacss/no-hardcoded-color': ['error', { noOpacity: true }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
});
