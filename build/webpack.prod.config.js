const path = require('path');
const merge = require('webpack-merge');
// 将样式文件单独打包输出的文件由配置文件中的output属性指定
// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用于优化或者压缩css资源,针对MiniCssExtractPlugin抽取出来的css文件进行压缩
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
/* 
它会将所有 required 的 *.css 模块抽取到分离的 CSS 文件。 
所以你的样式将不会内联到 JS bundle，而是在一个单独的 CSS 文件。
如果你的样式文件很大，这样会提速，因为 CSS bundle 和 JS bundle 是平行加载的
但是会增加额外的http请求
需要webpack3支持,webpack4似乎不再支持
*/
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

// 每次打包前清空文件目录
const CleanWebpackPlugin = require('clean-webpack-plugin')

const common = require('./webpack.base.config.js')
const { assetsPath, getPageGenerate } = require('./utils.js')
const pagesGenerate = getPageGenerate()
const config = require('./config/index.js')

const prodWebpackConfig = merge(common, {
	mode: "production",
	output: {
		// 编译生成的文件放在static目录的js目录下,如果js目录不存在则自动创建
		filename: assetsPath('js/[name].[chunkhash].js'),
		// 打包输出文件夹位置
		path: config.build.path,
		// 输出解析文件的目录，指定资源文件引用的目录 ，打包后浏览器访问服务时的 url 路径中通用的一部分
		publicPath: config.build.publicPath
	},
	module: {
		rules: [
			{
				test: /\.(c|sc)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					"sass-loader"
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					chunks: 'initial',
				name: 'common',
				// 入口文件引入同一个js三次以上
				minChunks: 3,
				minSize: 1,
				filename: assetsPath("js/[name].[chunkhash].js")
				}
			}
		}
	},
	plugins: [
		...pagesGenerate.htmlWebpackPlugin,
		// 打包输出前清空目标输出文件夹目录
		new CleanWebpackPlugin(),
		// 压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: { safe: true }
		}),
		// 抽取css
		new MiniCssExtractPlugin({
			filename: assetsPath("css/[name].[chunkhash].css") 
		})
	]
})

module.exports = prodWebpackConfig