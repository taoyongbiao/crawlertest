import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './src/main/preload.ts',
  target: 'electron-preload',
  mode: 'development',
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // true仅编译，不进行类型检查
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], //import 引入时，不需要写后缀 查找的顺序
  },
  output: {
    filename: 'preload.js',
    publicPath: './',
    path: path.resolve(process.cwd(), 'dist'), //path.resolve(__dirname, '../../dist'), // 确保路径正确 //
    library: {
      type: 'umd', // 使用新的 library.type 配置 打包成通用库
    },
    iife: true, // 期望输出为一个立即执行函数表达式（IIFE） 当输出umd时，将使用IIFE包装输出。
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  experiments: {
    outputModule: true, // 启用 ES 模块输出webpack5中还是实验性功能 尤其在混合模块中
  },
};
