const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin') //Gzip
const PurgecssPlugin = require('purgecss-webpack-plugin') //去除多余css
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //打包分析
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const webpack = require('webpack')
let path = require('path')
let glob = require('glob')
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {},
		basename, tmp, pathname;

	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		// console.log(entry)
		tmp = entry.split('/').splice(-3);
		pathname = basename; // 正确输出js和html的路径

		// console.log(pathname)
		entries[pathname] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			title: tmp[2],
			filename: tmp[2]
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');
//配置end
module.exports = {
	lintOnSave: false, //禁用eslint
	productionSourceMap: false,
	pages,
	devServer: {
		index: 'login.html', //默认启动serve 打开index页面
		open: process.platform === 'darwin',
		host: '',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: null, // 设置代理
		before: app => {}
	},
	// css相关配置
	css: {
		extract: true, // 是否使用css分离插件 ExtractTextPlugin
		sourceMap: false, // 开启 CSS source maps?
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}, // css预设器配置项
		modules: false // 启用 CSS modules for all css / pre-processor files.
	},
	// 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
	parallel: require('os').cpus().length > 1,

	chainWebpack: config => {
		/* 图片压缩 */
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				options.limit = 100
				return options
			})
		config.optimization.splitChunks({
			cacheGroups: {
				vendors: {
					name: 'chunk-vendors',
					minChunks: 2,
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		});
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if (process.env.NODE_ENV === "production") {
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);
		}
		/* 打包分析 */
		if (process.env.IS_ANALYZ) {
		  config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
		    {
		      analyzerMode: "static"
		    }
		  ]);
		}
		/* 别称 */
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('@ant-design/icons/lib/dist$', resolve('src/icons.js'))
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			config.output = {
				path: path.join(__dirname, "./dist"),
				publicPath: "/",
				filename: "js/[name].[contenthash:8].js"
			};
		}
		if (IS_PROD) {
			const plugins = []

			//移除console
			plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							drop_console: true
						}
					},
					sourceMap: true
				})
			)
			//gzip压缩
			plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: productionGzipExtensions,
					threshold: 10240,
					minRatio: 0.8
				})
			)
			plugins.push(
				// new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
				new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)

			)

			config.plugins = [...config.plugins, ...plugins]
		}

	}
}
