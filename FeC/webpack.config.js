var path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');


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
	// optimization: {
	// 	minimizer: [new UglifyJsPlugin()],
	// 	namedModules: false,
	// 	namedChunks: false,
	// 	nodeEnv: 'production',
	// 	flagIncludedChunks: true,
	// 	occurrenceOrder: true,
	// 	sideEffects: true,
	// 	usedExports: true,
	// 	concatenateModules: true,
	// 	noEmitOnErrors: true,
	// 	checkWasmTypes: true,
	// 	minimize: true,
	// },
	plugins: [
		new CompressionPlugin({
		filename: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.js(\?.*)?$/i,
		threshold: 10240,
		minRatio: 0.8
		}),
		new BrotliPlugin({
			filename: '[path].br[query]',
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0.8
		})
	   ]
}