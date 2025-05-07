import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  mode: 'development', // 设置 mode 选项为 development 或 production
  entry: './src/renderer/index.tsx', // 渲染进程入口文件
  target: 'electron-renderer', // 指定目标为 Electron 渲染进程
  output: {
    path: path.resolve(process.cwd(), 'dist'), // 修改为项目根目录下的 dist 文件夹 js的文件
    filename: 'renderer.bundle.js',
    publicPath: './', // HtmlWebpackPlugin 插件的重要选项 指定生成的资源文件（如 JavaScript 和 CSS 文件）的公共路径前缀
    //  /是相对于服务器的根目录  ./或不设置是相对于当前目录 以确保在不同环境中都能正确加载资源文件。
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // 解析规则
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // 仅编译，不进行类型检查
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用 MiniCssExtractPlugin.loader 替代 'MiniCssExtractPlugin.loader'
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'output.css', // 输出 CSS 文件名 如果不使用则会内联到 JS 中
    }),
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html', // 指定使用的模板文件
      inject: 'body', // 注入到 <body> 中
    }),
  ],
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'dist'),
    },
    compress: true,
    hot: true,
    open: true,
    port: 3000, // 确保端口号与 launch.json 中的 url 一致
  },
  // 添加 node 字段以处理 global 变量
  node: {
    global: true,
    __dirname: false,
    __filename: false,
  },
  // 添加 stats 选项以输出详细的打包过程信息
  stats: 'verbose',
};
