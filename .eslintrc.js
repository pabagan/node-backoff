module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'ava',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ava/recommended',
  ],
  rules: {
    'arrow-parens': [0],
    'no-console': ['warn', { allow: ['error', 'info'] }],
    quotes: ['error', 'single'],
    'arrow-body-style': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    semi: ['error', 'always'],
    // 'no-floating-promises': 'error',
    'max-len': ['error', {
      code: 100,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    // 'ava/assertion-arguments': 'error',
    // 'ava/hooks-order': 'error',
    // 'ava/max-asserts': [
    //   'off',
    //   5
    // ],
    // 'ava/no-async-fn-without-await': 'error',
    // 'ava/no-cb-test': 'off',
    // 'ava/no-duplicate-modifiers': 'error',
    // 'ava/no-identical-title': 'error',
    'ava/no-ignored-test-files': 'off',
    // 'ava/no-ignored-test-files': ['error', {
    //   'files': [
    //     'build/**/*.test.js',
    //     'src/**/*.test.ts',
    //   ]
    // }],
    // 'ava/no-import-test-files': 'error',
    // 'ava/no-incorrect-deep-equal': 'error',
    // 'ava/no-inline-assertions': 'error',
    // 'ava/no-invalid-end': 'error',
    // 'ava/no-nested-tests': 'error',
    // 'ava/no-only-test': 'error',
    // 'ava/no-skip-assert': 'error',
    // 'ava/no-skip-test': 'error',
    // 'ava/no-statement-after-end': 'error',
    // 'ava/no-todo-implementation': 'error',
    // 'ava/no-todo-test': 'warn',
    // 'ava/no-unknown-modifiers': 'error',
    // 'ava/prefer-async-await': 'error',
    // 'ava/prefer-power-assert': 'off',
    // 'ava/prefer-t-regex': 'error',
    // 'ava/test-ended': 'error',
    // 'ava/test-title': 'error',
    // 'ava/test-title-format': 'off',
    // 'ava/use-t': 'error',
    // 'ava/use-t-well': 'error',
    // 'ava/use-test': 'error',
    // 'ava/use-true-false': 'error'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        paths: ['node_modules', 'src']
      }
    }
  }
  // env: {
  //   browser: true,
  // }
};
