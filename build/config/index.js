const path = require('path');

module.exports = {
	// 开发环境下的devServer配置
	dev: {
		port: 8848,
		autoOpenBrower: true,
		host: 'localhost',
		overlay: { warnings: false, errors: false },
		openPage: 'home.html'
	},
	// 生产环境下的output配置
	build: {
		path: path.resolve(__dirname, '../../','./dist'),
		//如果是目录大于二级,必须设置'/'
		publicPath: './'
	}
}