import path from 'path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  entry: './src/main/main.ts', // 主进程入口文件
  target: 'electron-main', // 指定目标为 Electron 主进程
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'main.bundle.js',
    publicPath: './',
    // clean: true,
  },
  experiments: {
    outputModule: true, // 启用 ES 模块输出 electron-main默认生成commonjs模块
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // 解析规则
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
