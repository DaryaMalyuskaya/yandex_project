const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => ({
    mode: env.production ? 'production' : 'development',
    entry: './src/components/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    devtool: env.production ? 'source-map' : 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                        filter: (tag, attribute, attributes, resourcePath) => {
                                            if (attributes.find(el => el.value === '')) {
                                                return false;
                                            }

                                            return true;
                                        },
                                    },
                                ]
                            }
                        },
                    }
                ]
            }
        ],
    },
    optimization: {
        minimize: env.production,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
});