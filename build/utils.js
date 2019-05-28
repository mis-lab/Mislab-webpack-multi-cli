const pages = require('./config/pages.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  

function resove(dir) {
	return path.join(__dirname, '..', './src/pages', dir)
}

// 获取入口的js和获取需要添加指定的文件名
function getPageGenerate() {
	let entry = {}
	let	htmlWebpackPlugin = []

	pages.forEach((item, index) => {
		let name = item.name
		entry[name] = resove(item.entry)
		// 处理多级目录
		let catalogue = item.template.split('/');
		// 删除并返回数组最后一个元素
		catalogue.pop();
		htmlWebpackPlugin.push(new HtmlWebpackPlugin({
			// path.join()连接路径,filename指定输出地址
			filename: path.join(__dirname, '..',`/dist/${catalogue}.html`),
			// 生成文件所依赖的模板
			template: resove(item.template),
			title: item.title,
			// 需要引入的js
			chunks: [name, 'common'],
			minify: {
				removeComments: false,
				collapseWhitespace: false,
				removeAttributeQuotes: false,
				//压缩html中的js
				minifyJS: false,
				//压缩html中的css
				minifyCSS: false
			},
			// script的顺序,dependency按照不同文件的依赖关系来排序
			chunksSortMode: 'dependency'
		}))
	})
	return {
		entry,
		htmlWebpackPlugin
	}
}

// 返回到static目录的相对路径
function assetsPath(dir) {
	return path.posix.join('static', dir)
}

module.exports = {
	getPageGenerate,
	assetsPath
}
