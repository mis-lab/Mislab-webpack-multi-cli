const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.base.config.js');
const webpack = require('webpack');
const path = require('path');
const { getPageGenerate } = require('./utils.js');
const pagesGenerate = getPageGenerate();
const portfinder = require('portfinder');
const config = require('./config/index.js');

const devWebpackConfig = merge(common, {
	mode: 'development',
	devServer: {
		// contentBase: path.join(__dirname, '..', './dist/'),
		contentBase: false,
		historyApiFallback: false,
		// 启用HMR
		hot: true,
		clientLogLevel: 'warning',
		// 构建失败时也要启用HMR(浏览器不刷新)
		hotOnly: true,
		quiet: true,
		// 出现错误时，在浏览器中显示全屏覆盖层
		overlay: config.dev.overlay,
		host: config.dev.host,
		port: config.dev.port,
		// 服务启动后是否打开浏览器
		open: config.dev.autoOpenBrower,
		// 默认打开的页面
		openPage: config.dev.openPage
	},
	module: {
		rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.join(__dirname, '..', 'src')], // 指定检查的目录
        options: {                                 // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
            formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.(c|sc)ss$/,
        use: [
          'style-loader',
          'css-loader',
          "sass-loader"
        ]
      }
		]
	},
	plugins: [
	  ...pagesGenerate.htmlWebpackPlugin,
	  //启用热替换模块HMR
	  new webpack.HotModuleReplacementPlugin()
	]
})

module.exports = new Promise((reslove, reject) => {
	portfinder.basePort = config.dev.port;
	portfinder.getPort((err, port) => {
		if(err) {

		} else {
		devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`您的应用运行成功: http://localhost:${config.dev.port}/${config.dev.openPage}`],
				}
			}))
		}
		
		reslove(devWebpackConfig);
	})
})
