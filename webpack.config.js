const path = require('path')

module.exports = {
    mode: 'development',
    entry: './frontend/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'assets', 'js')
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            } 
        
        ]
    },
    devtool: 'source-map'

}