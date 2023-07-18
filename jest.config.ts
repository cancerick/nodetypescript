module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: [
    "<rootDir>/test/*.spec.ts"
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true
};