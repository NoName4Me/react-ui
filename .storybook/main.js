const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(mdx|tsx)'],
  addons: [
    '@storybook/preset-scss',
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     configureJSX: true,
    //   },
    // },
  ],
};
