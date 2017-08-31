const webpack = require("webpack");
const webpackMerge = require("webpack-merge"); 

const helpers = require("./helpers");
const commonConfig = require("./webpack.common.js");

const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = () => {
    return webpackMerge(commonConfig(), {
        output: {
            path: helpers.root("dist"),
            filename: "./js/[name].js",
            chunkFilename: "[id].chunk.js",
            sourceMapFilename: "[file].map",
            library: "bu_[name]",
            libraryTarget: "var",
        },

        devtool: "cheap-module-source-map",

        cache: true,

        module:{
            rules: [
                // {
                //     enforce: "pre",
                //     test: /\.tsx?$/,
                //     use: "source-map-loader",
                //     exclude: [/\.(spec|e2e)\.ts$/]
                // },
                {
                    test: /\.tsx?$/,
                    enforce: "pre",
                    use: [
                        {
                            loader: "tslint-loader",
                            options: {
                                configFile: helpers.root("tslint.json"),
                                cacheDirectory: true
                            }
                        }
                    ],
                    include: helpers.root("./src"),
                    exclude: [/\.(spec|e2e)\.ts$/]
                },
                {
                    enforce: "pre",
                    test: /\.s?css$/,
                    use: "source-map-loader"
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                                options: {
                                    sourceMap: true,
                                    importLoaders: 1,
                                }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
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
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                            }
                        }
                    ],
                    include: [ helpers.root("./src/sass/") ]
                }
            ]
        },

        plugins: [
            new webpack.LoaderOptionsPlugin({
                debug: true,
                option: {
                    htmlLoader: {
                        minimize: false
                    }
                }
            }),
            
            new webpack.NoEmitOnErrorsPlugin(),

            new webpack.HotModuleReplacementPlugin(),

            new webpack.NamedModulesPlugin(), 

            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
                }
            }),

            // new StyleLintPlugin({
            //     configFile: helpers.root("./.stylelintrc"),
            //     context: helpers.root("./src/assets/sass"),
            //     failOnError: true,
            //     files: ["main.scss"],
            //     quiet: true,
            //     syntax: "scss"
            // })
        ],

        devServer: {
            port: 8585,
            host: "localhost",
            proxy: {
                "/api": "http://localhost:3001"
            },
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        },

        node: {
            global: true,
            crypto: "empty",
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    })
}