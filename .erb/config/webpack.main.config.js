import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  entry: './src/main/main.ts', // 主进程入口文件
  target: 'electron-main', // 指定目标为 Electron 主进程
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
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
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};