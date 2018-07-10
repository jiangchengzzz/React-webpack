const path=require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');

// HappyPack加快webpack构建速度
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports ={
  //入口文件配置
  // 为app.js文件。若入口文件为index.js,这里可以直接写成'./src'
  entry:'./src/app.js',
  //入口文件很多的话，可以写成下面的格式：
  // entry:{
  //   pageOne: './src/pageOne/index.js',
  //   pageTwo: './src/pageTwo/index.js',
  //   pageThree: './src/pageThree/index.js'
  // }

  //配置编译成功后文件存放的位置
  output: {
    filename: 'bundle.js', // js合并后输出的文件，命名为bundle.js
    path: path.resolve(__dirname, 'build'), // 合并后的文件存放位置，根目录build
  },
  // 如果是多个输出文件
  // output: {
  //   filename: '[name].js', // name为变量，等同于pageOne/pageTwo/pageThree
  //   path: path.resolve(_dirname, 'build'),
  // }
  module:{
    rules:[
      {
        test:/\.css$/,
        use:ExtractTextPlugin.extract({//使用ExtractTextPlugin 插件
          fallback:"style-loader",//用于开发环境
          use:["css-loader","postcss-loader"]
        }),
      },
      {   //配置辅助loader,处理图片  
        test:/\.(png|jpg|gif)$/,
        loader:'url-loader',
        options:{limit:8192,name:"images/[name].[ext]"}
      },
      {   //配置辅助loader,处理图片  
        test:/\.(png|jpg|gif)$/,
        loader:'url-loader',
        options:{limit:8192,name:"images/[name].[ext]"}
      },
      { //处理图片外的其他文件类型
          test:/\.(appcache|svg|eot|ttf|woff|woff2|mp3|pdf)(\?|$)/,
          include:path.resolve(__dirname,'src'),
          loader:'file-loader?name=[name].[ext]' 
      },
      {
        test:/\.less$/,
        use:ExtractTextPlugin.extract({//使用ExtractTextPlugin 插件
          fallback:"style-loader",//用于开发环境
          use:["css-loader","postcss-loader","less-loader"]
        }),
      },
      {
        test:/\.scss$/,
        use:ExtractTextPlugin.extract({//使用ExtractTextPlugin 插件
          fallback:"style-loader",//用于开发环境
          use:["css-loader","postcss-loader","sass-loader"]
        }),
      },
      {
        test:/\.jsx$/,
        exclude:/(node_modules|bower_components)/,//排除XXX类型文件
        use:{
            loader:'babel-loader'           
        }
      },
      {
        test:/\.js$/,    
        include:path.resolve(__dirname),
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
        //排除node_modules 目录下的文件
        exclude: /node_modules/,
      }
    ]
  },

  plugins: [
    new HtmlwebpackPlugin({
      title:'reactwebpack'
      /* 全部都是可选项
        title:"reactwebpack",   配置html 的title
        filename: , html文件的名字，默认是index
        template:'', 模板文件路径
        inject:true|'body'|'head'|'false', 设置为 true|'body':js文件引入的位置为body的结束标签之前
        favicon:'',  设置html的icon图标
        minify:{}|false, 暂时不理解这个参数的使用
        hash:true|false,  将添加唯一的webpack编译hash到所有包含的脚本和css文件
        cache:true|false, 默认为true，仅仅在文件修改之后才会发布
        showErrors:true|false, 默认为true，错误信息写入HTML页面中
        chunks: 允许添加某些块（比如unit test）
        chunksSortMode: 允许控制块在添加到页面之前的排序方式
        excludeChunks: 允许跳过模型块，比如单元测试块
      */
    }),
    new ExtractTextPlugin("styles.css"), // 插件声明
    
    // new HappyPack({
    //   id:"happybabel",
    //   loaders:['babel-loader'],
    //   threadPool:happyThreadPool,
    //   cache:true,
    //   verbose:true
    // }),
    
    // happypack
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),



    /**
     * 我好气啊，阅读了一大堆帖子，好几种配置，最后都报同一个错，暂时放弃。 
     */
    // new webpack.DllReferencePlugin({
    //   manifest: require(path.join(__dirname, 'dist', 'manifest.json')),
    // }),
  ],

  resolve:{
    extensions:['.js','jsx','less','.css','.scss']//后缀名自动补全
  },
  // webpack 提供的辅助工具，调试的时候能正确的显示源代码出错的行数  eval-soure-map用于开发模式下
  devtool:'eval-soure-map'
}