module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Allow console in tests
    'no-console': 'off',
    // Allow any types in tests
    '@typescript-eslint/no-explicit-any': 'off',
    // Allow unused vars in tests (for test setup)
    '@typescript-eslint/no-unused-vars': 'off',
  },
};

