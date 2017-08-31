const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const helpers = require("./helpers");
const commonConfig = require("./webpack.common.js");

const OptimizeJsPlugin = require("optimize-js-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => {
    return webpackMerge(commonConfig(), {
        output: {
            path: helpers.root("dist"),
            filename: "./js/[name].[chunkhash].js",
            chunkFilename: "[id].[chunkhash].chunk.js",
            sourceMapFilename: "[file].[chunkhash].map"
        },

        devtool: "source-map",

        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    parser: require("postcss-scss"),
                                    plugins:  () => {
                                        return [
                                            require("precss"),
                                            require("postcss-flexbugs-fixes"),
                                            require("autoprefixer")
                                        ];
                                    }
                                }
                            },
                            {
                                loader: "sass-loader"
                            }
                        ],
                        fallback: "style-loader"
                    }),
                    include: [ helpers.root("./src/sass/") ]
                }
            ]
         },

         plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
                options: {
                    htmlLoader: {
                        minimize: true,
                        removeAttributeQuotes: false,
                        caseSensitive: true,
                        customAttrSurround: [
                        [/#/, /(?:)/],
                        [/\*/, /(?:)/],
                        [/\[?\(?/, /(?:)/]
                        ],
                        customAttrAssign: [/\)?\]?=/]
                    },
                    imageWebpackLoader: {
                        mozjpeg: {
                            progressive: true,
                            arithmetic: false
                        },
                        optimizationLevel: 7,
                        gifsicle: {
                            interlaced: false
                        },
                        mozjpeg: {
                            quality: 65
                        },
                        optipng: false,
                        pngquant:{
                            quality: "65-90",
                            speed: 4
                        },
                        svgo:{
                            plugins: [
                                { removeViewBox: false },
                                { removeEmptyAttrs: false },
                                { removeTitle: true },
                                { convertPathData: false }
                            ]
                        }
                    }
                }
            }),

            new webpack.optimize.UglifyJsPlugin({ 
                beautify: false, 
                output: {
                    comments: false
                }, 
                mangle: {
                    screw_ie8: true
                }, 
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false 
                },
            }),

            new OptimizeJsPlugin({
                sourceMap: false
            }),

            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/,
                cssProcessor: require("cssnano"),
                cssProcessorOptions: {
                    discardDuplicates: { removeAll: true },
                    discardComments: {removeAll: true }
                },
                canPrint: true
            }),

            new webpack.optimize.OccurrenceOrderPlugin(),

            new webpack.HashedModuleIdsPlugin(),

            new ExtractTextPlugin({
                filename: "./css/[name].[contenthash].css",
                allChunks: true,
                disable: false
            }),

            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
                }
            }),
        ],

        node: {
            global: true,
            crypto: "empty",
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    })
}