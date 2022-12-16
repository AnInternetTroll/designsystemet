/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
};
