module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
  ],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // General rules
    'no-console': 'off', // Allow console.log for scripts
    'no-debugger': 'error',
    'no-unused-vars': 'off', // Use TypeScript version instead
    
    // Code style
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
  },
  env: {
    node: true,
    es6: true,
    jest: true, // Add Jest environment
  },
  ignorePatterns: [
    'build/',
    'node_modules/',
    '*.js',
    'scripts/',
    'dump.js',
  ],
}
