const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    webpack(config, env) {
        config.resolve.plugins.push(new TsconfigPathsPlugin());

        return config;
    },
};
