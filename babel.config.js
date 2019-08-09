const plugins = [];
// if(['production', 'prod'].includes(process.env.NODE_ENV)) {
//   plugins.push("transform-remove-console")
// }

module.exports = {
// 	presets: [
// 		["@vue/app", {
// 			"useBuiltIns": "entry"
// 		}]
// 	],
	presets: [
		'@vue/app',
		 [
		  '@babel/preset-env',
		  {
		    'useBuiltIns': 'entry'
		  }
		]
	],
	
	"plugins": [
		["import", {
			"libraryName": "ant-design-vue",
			"libraryDirectory": "es",
			"style": "css"
		}] // `style: true` 会加载 less 文件
	]

};
 