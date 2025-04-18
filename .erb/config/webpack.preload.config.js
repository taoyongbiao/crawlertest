import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './src/main/preload.ts',
  target: 'electron-preload',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'preload.js',
    path: path.resolve(process.cwd(), 'dist'), //path.resolve(__dirname, '../../dist'), // 确保路径正确
    libraryTarget: 'module', // 设置为 ES 模块输出
  },
  externals: [nodeExternals()],
  experiments: {
    outputModule: true, // 启用 ES 模块输出
  },
};
