import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import config from './config.js'
import CopyWebpackPlugin from 'copy-webpack-plugin';

import {cssLoader} from './lib/until.js'

let baseConfig = {
    context: path.resolve(__dirname, '../client'),
    entry: {
        app: ['./startup/main.js'],
        vendor: config.get('vendor_dependencies')
    },
    output: {
        path: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
    },
    resolve: {
        modules: [
            "imports",
            "imports/bower_components",
            path.resolve(__dirname, "../client"),
            "node_modules"
        ],
        descriptionFiles: [
            'package.json', 'bower.json'
        ],
        mainFiles: [
            "main", "index"
        ],
        aliasFields: ["browser"],
        extensions: ['.js'],
        alias: {
            'images': 'assets/images',
            'stylesheets': 'assets/stylesheets',
            'script': 'assets/script',
            'fonts': 'assets/fonts'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: [
                                [
                                    'env', {
                                        modules: false
                                    }
                                ],
                                'react'
                            ],
                            plugins: ["transform-runtime", "syntax-dynamic-import", "styled-jsx/babel", "jsx-control-statements"]
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.html$/,
                use: ["raw-loader"]
            }, {
                test: /\.json$/,
                include: path.resolve(__dirname, './client'),
                use: ["json-loader"]
            }, {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "images/[name].[ext]",
                            limit: 8192
                        }
                    }
                ]
            }, {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: "url-loader",
                query: {
                    limit: 8192,
                    name: "fonts/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({"React": "react", "ReactDom": "react-dom"}),
        new webpack.optimize.CommonsChunkPlugin({names: ['vendor']}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'lib/index.ejs'),
            title: config.get('titleTag'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: './assets/manifest.json',
                to: './'
            }, {
                from: './assets/favicon.ico',
                to: './'
            }, {
                from: './assets/icons',
                to: './icons'
            }
        ])
    ],
    stats: {
        colors: true
    }
}

baseConfig = cssLoader(baseConfig);
export default baseConfig
