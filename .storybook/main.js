const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.(mdx|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-docs',
      // options: {
      //   configureJSX: true,
      //   babelOptions: {},
      //   sourceLoaderOptions: null,
      // },
    },
    '@storybook/preset-typescript',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
