export default () => ({
    webpack(config, state) {
        if (state.stage === 'node') {
            if (!Array.isArray(config.externals)) {
                if (config.externals === undefined) {
                    config.externals = [];
                } else {
                    config.externals = [config.externals];
                }
            }
            config.externals.push({
                react: {
                    commonjs: 'react',
                    commonjs2: 'react',
                    root: 'react',
                    umd: 'react',
                    umd2: 'react',
                },
                'react-dom': {
                    commonjs: 'react-dom',
                    commonjs2: 'react-dom',
                    root: 'react-dom',
                    umd: 'react-dom',
                    umd2: 'react-dom',
                },
            });
        }
        if (state.stage === 'prod') {
            config.entry = [
                'babel-polyfill',
                'unfetch/polyfill',
                'core-js/web/url',
                ...(Array.isArray(config.entry)
                    ? config.entry
                    : [config.entry]),
            ];
        }
        return config;
    },
});
