var path = require('path'),
    libPath = path.join(__dirname, 'lib'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'app': path.join(libPath, 'index.ts'),
        'vendors': path.join(libPath, 'vendors.ts'),
        'style': path.join(libPath, 'index.scss')
    },
    output: {
        path: wwwPath,
        filename: '[name]-[hash:6].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts',
            exclude: [
                /node_modules/
            ]
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.scss$/,
            loader: "style!css!autoprefixer?browsers=last 2 versions!sass"
        }],
        noParse: [/angular2\/bundles\/.+/]
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.html', '.scss']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(libPath, 'index.html')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({

            /* Something of these are required for working dist build */
            beautify: false, //prod
            deadCode: true,
            unused: true,
            compress: {screw_ie8: true}, //prod
            comments: false, //prod
            mangle: {
                screw_ie8: true,
                except: [
                    'App',
                    'About',
                    'Contact',
                    'Home',
                    'Menu',
                    'Footer',
                    'XLarge',
                    'RouterActive',
                    'RouterLink',
                    'RouterOutlet',
                    'NgFor',
                    'NgIf',
                    'NgClass',
                    'NgSwitch',
                    'NgStyle',
                    'NgSwitchDefault',
                    'NgControl',
                    'NgControlName',
                    'NgControlGroup',
                    'NgFormControl',
                    'NgModel',
                    'NgFormModel',
                    'NgForm',
                    'NgSelectOption',
                    'DefaultValueAccessor',
                    'NumberValueAccessor',
                    'CheckboxControlValueAccessor',
                    'SelectControlValueAccessor',
                    'RadioControlValueAccessor',
                    'NgControlStatus',
                    'RequiredValidator',
                    'MinLengthValidator',
                    'MaxLengthValidator',
                    'PatternValidator',
                    'AsyncPipe',
                    'DatePipe',
                    'JsonPipe',
                    'NumberPipe',
                    'DecimalPipe',
                    'PercentPipe',
                    'CurrencyPipe',
                    'LowerCasePipe',
                    'UpperCasePipe',
                    'SlicePipe',
                    'ReplacePipe',
                    'I18nPluralPipe',
                    'I18nSelectPipe'
                    ] // Needed for uglify RouterLink problem
                }, // prod
            /* Something of these are required for working dist build */

            minimize: true,
            sourceMap: false,
            /*mangle: {
                except: ['$super', '$', 'exports', 'require']
            }/*,
            output: {
                comments: true
            },
            */
        })
    ]
};
