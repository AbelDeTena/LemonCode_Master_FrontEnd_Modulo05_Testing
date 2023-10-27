module.exports = {
  rootDir: '../../',
  verbose: true,
  restoreMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
  preset: 'ts-jest',
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  testPathIgnorePatterns: [
    "<rootDir>/cypress/"
  ],
};
