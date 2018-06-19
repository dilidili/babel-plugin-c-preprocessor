# macro-preprocessor-loader

The [C preprocessor](https://en.wikipedia.org/wiki/C_preprocessor#Conditional_compilation) or cpp is the macro preprocessor for the C and C++ computer programming languages. The preprocessor provides the ability for the inclusion of header files, macro expansions, conditional compilation, and line control.

## Installation

```bash
npm install --save-dev macro-preprocessor-loader
```

## Usage

### webpack.config.js

Put the `macro-preprocessor-loader` as the last loader in the array, so it processes the code before
all others.

```js
module: {
  rules: [{
    test: /\.js$/,
    use: ['babel-loader', 'macro-preprocessor-loader']
  }]
}
```

### Supported directives
* [`#if`](https://en.wikipedia.org/wiki/C_preprocessor#Conditional_compilation)
* [`#else`](https://en.wikipedia.org/wiki/C_preprocessor#Conditional_compilation)
* [`#elif`](https://en.wikipedia.org/wiki/C_preprocessor#Conditional_compilation)
* [`#endif`](https://en.wikipedia.org/wiki/C_preprocessor#Conditional_compilation)

### On your code

Use `//#if expression` and `//#endif` to wrap blocks of code you want to be removed if a given
prediction is false.

```js
//#if process.env.NODE_ENV === 'DEVELOPMENT'
console.log('lorem')
console.log('ipsum')
//#endif
```

In the example above, the code will be removed if the enviroment variable `NODE_ENV` is not
`DEVELOPMENT`, removing unnecessary code from your production bundle.

The same technique can be used to prevent loading packages in the production bundle.

```js
// #if process.env.NODE_ENV !== 'BUILD'
import reduxLogger from 'redux-logger'
// #endif
```

## Credits
- [GCC C conditional documentation](https://gcc.gnu.org/onlinedocs/gcc-3.0.2/cpp_4.html)
- [webpack-conditional-loader](https://github.com/caiogondim/webpack-conditional-loader/blob/master/README.md)
