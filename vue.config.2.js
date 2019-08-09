const path = require('path')
let glob = require('glob')

function resolve(dir) {
	return path.join(__dirname, dir)
}

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
module.exports = {
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === "production") {
			config.output = {
				path: path.join(__dirname, "./dist"),
				publicPath: "/",
				filename: "js/[name].[contenthash:8].js"
			};
		}
	},

	chainWebpack: (config) => {
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
				},
				//       elementUI: {
				//         name: "chunk-elementUI",
				//         priority: 20,
				//         test: /[\\/]node_modules[\\/]element-ui[\\/]/,
				//         chunks: "all"
				//       }
			},

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
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('@api', resolve('src/api'))
			.set('@assets', resolve('src/assets'))
			.set('@comp', resolve('src/components'))
			.set('@views', resolve('src/views'))
			.set('@layout', resolve('src/layout'))
			.set('@static', resolve('src/static'))
	},

	css: {
		loaderOptions: {
			less: {
				modifyVars: {},
				javascriptEnabled: true,
			}
		}
	},
	// 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
	parallel: require('os').cpus().length > 1,
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

	lintOnSave: false
}
