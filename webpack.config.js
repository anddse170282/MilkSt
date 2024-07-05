const path = require('path');

module.exports = {
  mode: 'development', // Thêm dòng này để chỉ định chế độ phát triển
  entry: './src/app.jsx', // Đường dẫn tới file entry của bạn
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Xử lý cả file .js và .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Thêm phần mở rộng .jsx vào danh sách được xử lý
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
