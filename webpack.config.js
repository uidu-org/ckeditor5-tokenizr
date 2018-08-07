var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = {
  mode: "production",
  entry: [
    require.resolve("regenerator-runtime/runtime.js"),
    "./src/tokenizr.jsx"
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [require("babel-preset-env")]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        // Or /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/ if you want to limit this loader
        // to CKEditor 5 icons only.
        test: /\.svg$/,

        use: ["raw-loader"]
      },
      {
        // Or /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/ if you want to limit this loader
        // to CKEditor 5 theme only.
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true
            }
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
              },
              minify: true
            })
          }
        ]
      }
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader", "sass-loader"]
      //   })
      // },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader", "sass-loader"]
      //   })
      // }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  plugins: [
    // ...

    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "tokenizr.js"
  }
};
