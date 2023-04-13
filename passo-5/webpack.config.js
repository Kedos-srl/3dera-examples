const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const publicPath = path.resolve(__dirname, "public");
const srcPath = path.resolve(__dirname, "src");
const buildPath = path.resolve(__dirname, "docs");

module.exports = {
    // entry: path.join(srcPath, 'index.ts'),

    devServer: {
        host: "0.0.0.0",
    },

    output: {
        path: buildPath,
        filename: "bundle.js",
        assetModuleFilename: "assets/images/[name][ext]",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },

    resolve: {
        extensions: ["*", ".js", ".ts"],
    },

    devtool: "inline-source-map",

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: publicPath,
                    to: buildPath,
                    globOptions: {
                        ignore: ["src", "**/index.html"],
                    },
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.join(publicPath, "index.html"),
            filename: "index.html",
        }),
    ],
};
