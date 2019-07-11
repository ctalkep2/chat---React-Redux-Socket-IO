const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports ={
	entry: './src/app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, '/src/server'],
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader', 'sass-loader']
			}	
		]
	},
	plugins: [
    	new HtmlWebpackPlugin({
      		template: './src/app/index.html',
      		favicon: './src/app/image/favicon.ico',
    	})
  ]
}