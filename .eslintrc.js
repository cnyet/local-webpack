module.exports = {
  "extends": "standard",        //继承标准的规范
  "env": {                      //支持浏览器，nodejs，es6环境
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6,           //设定ECMAScript语法的版本，默认是5
    "sourceType": "module",     //设定代码是ECMAScript模块提供
    "ecmaFeatures": {           //附加的语法特性，支持jsx，
      "jsx": true
    }
  },
  "rules": {  
    "quotes": ["warn", "double"],           //引号用双引号，警告提示
    "camelcase": ["warn", { "properties": "never" }],    //属性命名规则可以不使用驼峰命名法
    "semi": ["error", "always"],            //分号结尾，
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，  
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号  
    "comma-dangle": ["error", "never"],    
    "curly":  ["error", "all"],             //函数或者条件判断时需要统一使用大括号
    "comma-spacing": "error",               //不允许在逗号前面出现空格
    "no-const-assign": "error",             //禁止修改const声明的变量
    "eol-last": "off",                      //代码间出现空白行，关闭提示
  }
};