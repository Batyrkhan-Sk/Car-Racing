module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'max-lines-per-function': ['warn', { max: 40 }],
    'no-magic-numbers': ['warn', { ignore: [0, 1, 2, -1,], enforceConst: true }],
    'react/react-in-jsx-scope': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'e', 
          'element', 
          'carElement', 
          'winnerSavedRef',
        ],
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};