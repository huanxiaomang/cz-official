

export default {
  ignores: ['**/*.md', '**/dist/**', '**/cache/**'],
  rules: {
    // 缩进使用两个空格
    indent: ['error', 2],

    // 要求语句末尾使用分号
    semi: ['error', 'always'],

    // 使用单引号
    quotes: ['error', 'single'],

    // 禁止声明但未使用的变量
    'no-unused-vars': 'error',

    // 禁止使用 console
    'no-console': 'warn',

    // 禁止额外的分号
    'no-extra-semi': 'error',

    // 要求使用严格相等运算符
    eqeqeq: 'error',

    // 要求使用块语句
    curly: 'error',

    // 禁止未使用的表达式
    'no-unused-expressions': 'error'
  }
};

// antfu(
//   {
//     unocss: true,
//     formatters: true,
//     rules: {

//     }
//   },
// )

//   {
//   "ignores": ["**/*.md"],
//   rules: {
//     // 对 Markdown 文件禁用 ESLint 检查
//     'eslint-disable': 'off'
//   }
// }
