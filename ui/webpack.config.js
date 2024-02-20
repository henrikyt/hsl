const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

USE_DEV_TOOLS = process.env.NODE_ENV === "development";

const proxy = {
	"/api": { target: "http://127.0.0.1:3500/", secure: false, changeOrigin: true },
};

/** @type {import("webpack").Configuration} */
module.exports = {
	mode: USE_DEV_TOOLS ? "development" : "production",
	target: USE_DEV_TOOLS ? "web" : "browserslist",
	entry: { main: "./src/index" },
	output: {
		filename: USE_DEV_TOOLS ? "[name].js" : "[name].[chunkhash].js",
		chunkFilename: USE_DEV_TOOLS ? "vendor/[name].bundle.js" : "vendor/[chunkhash].bundle.js",
		assetModuleFilename: USE_DEV_TOOLS ? "asset/[name][ext][query]" : "asset/[hash][ext][query]",
		path: path.resolve(__dirname, "./dist"),
		clean: true,
		publicPath: "auto",
	},
	plugins: [
		new Dotenv(),
		new CopyPlugin({
			patterns: [
				{
					from: "src/assets/static",
					to: "",
				},
			],
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/assets/index.html",
			publicPath: "/",
		}),
		new MiniCssExtractPlugin({
			filename: "asset/[name].[contenthash].css",
			chunkFilename: "asset/[contenthash].css",
		}),
		USE_DEV_TOOLS &&
			new ReactRefreshWebpackPlugin({
				exclude: [/node_modules/, /index\.(ts|js)$/],
				overlay: false,
			}),
	].filter(Boolean),
	optimization: {
		minimizer: ["...", new CssMinimizerPlugin()],
	},
	devServer: {
		client: { overlay: false },
		historyApiFallback: true,
		hot: USE_DEV_TOOLS,
		static: ["src/assets/static"],
		proxy,
	},
	devtool: USE_DEV_TOOLS ? "eval-cheap-module-source-map" : "source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "swc-loader",
				},
			},
			{
				test: /\.css$/,
				sideEffects: true,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /.(png|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				type: "asset/resource",
			},
			{
				test: /\.html$/i,
				oneOf: [
					{
						resourceQuery: /file/, // foo.html?file
						type: "asset/resource",
					},
				],
			},
		],
	},
	resolve: {
		symlinks: true,
		extensions: [
			".js",
			".jsx",
			".ts",
			".tsx",
			".json",
			".ts",
			".tsx",
			".woff2",
			".eot",
			".woff",
			".ttf",
			".png",
			".scss",
			".css",
			".properties",
			".html",
		],
		modules: ["node_modules"],
	},
};
