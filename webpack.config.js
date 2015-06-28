module.exports = {
    entry: './scripts/application.js',
    output: {
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        publicPath: './'
    },
    module: {
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'jQuery': 'jQuery'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool : "#source-map"
}
