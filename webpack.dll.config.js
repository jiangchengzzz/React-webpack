/**
 * 我好气啊，阅读了一大堆帖子，好几种配置，最后都报同一个错，暂时放弃。 
 */

const path = require('path')
const webpack = require('webpack')
/**
 * 尽量减小搜索范围
 * target: '_dll_[name]' 指定导出变量名字
 */
const vendors = [
  'react',
  'react-dom',
]
module.exports = {
    entry: {
        vendor: vendors,
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].dll.js',
        library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
    },
    // manifest是描述文件
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', 'manifest.json')
        })
    ]
}
// console.log(32423)