# Setup Webpack

### Some basic npm commands: 
```
1. npm init -y : reset npm
2. npm i --save-dev webpack webpack-cli : install Webpack
3. npm i --save-dev babel-core babel-preset-env babel-preset-react babel-loader
4. npm i --save-dev webpack-dev-server
5. npm i --save-dev html-webpack-plugin
6. npm i --save-dev react react-dom
```

### WEBPACK

**Every options contains in module.exports**

```
module.exports = {}
```

**There are many options:** 
1. The input file
```
entry: path.join(__dirname, 'src', 'app.js'),
```
2. the output file - in output properties, there are 2 properties (path, filename)
```
output: {
   path: path.join(__dirname, 'dist'),
   filename: 'app.bundle.js'
}
```
3. You need to set the mode option to 'development' or 'production' so that webpack know if it need to compile into a dev version (uncompressed) or production version (compressed)
```
mode: process.env.NODE_ENV || 'development'
```
4. Teach webpack how to compile babel
```
module: {
    rules: [{
        test: /\.(js|jsx)$/, - a regular expression to make sure the file input is correct type
        exclude: /node_modules/, - ignore node_modules folder
        use: ['babel-loader'] - use babel-loader
    }]
}
```
