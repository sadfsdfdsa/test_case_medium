const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    assetsDir: '',
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new WebpackShellPlugin({
                onBuildStart: ['echo Copy'],
                //onBuildEnd: ['cp ../static/index.html ../templates/index.html']
            })
        ],
    },
};
