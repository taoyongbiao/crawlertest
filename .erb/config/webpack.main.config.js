import path from 'path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: 'development', // 设置 mode 选项为 development 或 production
  entry: './src/main/main.ts', // 主进程入口文件
  target: 'electron-main', // 指定目标为 Electron 主进程
  stats: 'verbose', //输出全部信息
  output: {
    path: path.resolve(process.cwd(), 'dist'), //控制js css的实际输出目录
    filename: 'main.bundle.js',
    publicPath: './', //控制在浏览器中的加载路径 以确保在不同环境中都能正确加载资源文件。
    // clean: true,
  },
  experiments: {
    outputModule: true, // 启用 ES 模块输出 electron-main默认生成commonjs模块
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // 解析规则
  },
  node: {
    __dirname: true, // 解决__dirname报错的问题
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
};
