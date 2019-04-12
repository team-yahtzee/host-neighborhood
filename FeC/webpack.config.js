var path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');
// const BrotliPlugin = require('brotli-webpack-plugin');

var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
	entry: `${SRC_DIR}/index.jsx`,
	output: {
		filename: 'bundle.js',
		path: DIST_DIR
	},
	module: {
		rules: [{
				test: /\.jsx?/,
				include: SRC_DIR,
				use: 'babel-loader'
			},

			{
				test: /\.css/,
				include: SRC_DIR,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	// plugins: [
	// 	new CompressionPlugin({
	// 	filename: '[path].gz[query]',
	// 	algorithm: 'gzip',
	// 	test: /\.js(\?.*)?$/i,
  //   })
  // ]
}