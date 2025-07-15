// @ts-check

import eslint from '@eslint/js';
import {  globalIgnores } from "eslint/config";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ...eslint.configs.recommended,
    ignores: ["node_modules/**/*", "dist/**/*", "tmp/**/*"],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
  globalIgnores(["node_modules/**/*", "dist/**/*", "tmp/**/*", "client/dist/**/*"]),
  tseslint.configs.recommended,
);
