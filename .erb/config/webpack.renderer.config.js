import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/renderer/index.tsx", // 渲染进程入口文件
  target: "electron-renderer", // 指定目标为 Electron 渲染进程
  output: {
    path: path.resolve(process.cwd(), "dist"), // 修改为项目根目录下的 dist 文件夹
    filename: "renderer.bundle.js",
    publicPath: "/", // HtmlWebpackPlugin 插件的重要选项 指定生成的资源文件（如 JavaScript 和 CSS 文件）的公共路径前缀
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"], // 解析规则
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"], // 添加 postcss-loader
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html", // 指定使用的模板文件
      inject: "body", // 注入到 <body> 中
    }),
  ],
  devServer: {
    static: {
      directory: path.join(process.cwd(), "dist"),
    },
    compress: true,
    port: 3000, // 确保端口号与 launch.json 中的 url 一致
  },
  // 添加 node 字段以处理 global 变量
  node: {
    global: true,
    __dirname: false,
    __filename: false,
  },
  // 添加 stats 选项以输出详细的打包过程信息
  stats: "verbose",
};