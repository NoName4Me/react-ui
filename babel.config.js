module.exports = function(api) {
  api.cache(true);
  let defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: process.env.BABEL_ENV === 'cjs' ? 'cjs' : false,
      },
    ],
  ];
  const defaultPlugins = [['@babel/plugin-transform-runtime', { useESModules: process.env.BABEL_ENV !== 'cjs' }]];

  return {
    presets: defaultPresets.concat([
      '@babel/preset-react',
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ]),
    plugins: defaultPlugins,
  };
};
