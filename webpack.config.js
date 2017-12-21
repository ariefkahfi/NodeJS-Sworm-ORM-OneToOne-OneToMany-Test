const path = require("path");

const webpack = require("webpack");
const UglifyJSPlugin =require("uglifyjs-webpack-plugin");

module.exports = {
    entry: {
        mainApp : "./app/app.js",
        formKelas : "./app/form/formKelas.js",
        formKelasWali : "./app/form/formKelasWali.js",
        formMurid : "./app/form/formMurid.js",
        formWaliKelas : "./app/form/formWaliKelas.js",
        listKelas : "./app/list/classListApp.js",
        listWaliKelas : "./app/list/homeroomTeacherListApp.js",
        listMurid : "./app/list/studentListApp.js",
        listWaliForKelas : "./app/list/homeroomForClassListApp.js"
    },
    output:{
        filename : "[name].bundle.js",
        path : path.join(__dirname,"dist")
    },
    devtool: "inline-source-map",
    plugins:[
        new UglifyJSPlugin(),
        new webpack.ProvidePlugin({
            $ : "jquery"
        })
    ],
    module: {
        rules: [
            {test : /\.js$/ , exclude : /node_modules/ , loader : "babel-loader"}
        ]
    }
};