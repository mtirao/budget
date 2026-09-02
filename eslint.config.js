import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

// Flat config resolution stops at the nearest eslint.config.js, so this file
// also keeps ESLint from walking up into unrelated configs outside the repo.
export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // Only the two long-standing hook rules — eslint-plugin-react-hooks's
      // `recommended`/`recommended-latest` configs also bundle React
      // Compiler-oriented rules (e.g. set-state-in-effect) that flag this
      // app's ordinary fetch-on-mount hooks as bugs. This project doesn't use
      // the React Compiler, so those rules aren't relevant here.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  {
    files: ['vite.config.ts', 'src/test/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
