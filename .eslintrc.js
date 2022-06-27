module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'import',
    'simple-import-sort',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  rules: {
    quotes: ['error', 'single'],
    'max-len': ['warn', { code: 80 }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'react/prop-types': 'off',
    // 'jsx-a11y/anchor-is-valid': 'off',
    // 'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/no-cycle': [0, { ignoreExternal: true }],
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-vars': 'warn',
    'react/jsx-no-bind': 'off',
    '@typescript-eslint/indent': ['off'],
    'no-var-requires': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/exports': 'error',
    'no-restricted-exports': 'off',
    'no-plusplus': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React related packages come first, then other external packages
          ['^react', '^@?\\w'],
          // Our external packages
          ['^@amomedia/'],
          // Internal packages
          [
            '^src',
            '^components',
            '^types',
            '^containers',
            '^hooks',
            '^layouts',
            '^auth',
            '^utils',
            '^contexts',
            '^pages',
            '^constants',
          ],
          // Relative imports
          ['^\\.'],
          // Side effect imports
          ['^\\u0000'],
          // Style imports
          ['/styled'],
        ],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
