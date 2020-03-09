module.exports = {
  rootDir: '../..',
  preset: 'jest-puppeteer',
  testRegex: 'src/.*\\.ui\\.test.js$',
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/setup.ui.js'],
};
