
const webpack = require("webpack");
const helpers = require("./helpers");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader")

const AssetsPlugin  = require("assets-webpack-plugin");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = () => {
    return {
        context: helpers.root("./src"),

        entry: {
            polyfills: "./polyfills.ts",
            vendor: "./vendor.ts",
            app: "./main.ts",
            style: "./sass/main.scss"
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [ 
                        {
                            loader: "angular2-template-loader"
                        },
                        {
                            loader: "awesome-typescript-loader",
                            options: { 
                                configFileName: helpers.root("tsconfig.json"),
                                 cacheDirectory: true 
                            }
                        }
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/] 
                },
                {
                    test: /\.html$/,
                    use: [ "html-loader" ],
                    exclude: [helpers.root("src/index.html")]
                },
                {
                    test: /\.(jp?g|png|svg|gif)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 30000
                            }
                        },
                        {
                            loader: "image-webpack-loader?bypassOnDebug"
                        }
                    ],
                },
                { 
                    test: /\.(eot|woff|woff2?|otf|ttf)([\?]?.*)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[hash].[ext]",
                                publicPath: "../fonts/",
                                outputPath: "./fonts/"
                            }
                        }
                    ]
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: "to-string-loader" 
                        }, 
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                parser: require("postcss-scss"),
                                plugins:  () => {
                                    return [
                                        require("postcss-modules"),
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
                    exclude: [ helpers.root("./src/sass/") ],
                    include: [helpers.root("./src/app/")]
                },
            ]
        },

        resolve: {
            extensions: [".ts", ".js"],
            modules: [helpers.root("src"), helpers.root("node_modules")]
        },

        plugins: [
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root("./src"), 
                { }
            ),

            new webpack.ContextReplacementPlugin(
                /moment[\/\\]locale/,
                /(en-gb|uq|ru)\.js/
            ),

            new webpack.optimize.CommonsChunkPlugin({
                name: ["app", "vendor", "polyfills"],
                minChunks: Infinity
            }),

            new HtmlWebpackPlugin({
                template: "./index.html",
                chunksSortMode: "dependency"
            }),

            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: "defer"
            }),

            new CheckerPlugin(),

            new AssetsPlugin({
                path: helpers.root("dist"),
                filename: "webpack-assets.json",
                prettyPrint: true,
                update: true
            }),

            new WebpackChunkHash({algorithm: "md5"}),

            new WebpackNotifierPlugin({ alwaysNotify: true, skipFirstNotification: true, excludeWarnings: true }),

            new ChunkManifestPlugin({
                filename: "chunk-manifest.json",
                manifestVariable: "webpackManifest"
            })
        ],

        node: {
            global: true,
            crypto: "empty",
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    }
}