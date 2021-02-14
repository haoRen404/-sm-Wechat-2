module.exports = {
    lintOnSave: false   // 是否开启eslint保存检测，有效值：ture | false | 'error'
    // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。
    // 默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败
    // 希望让 lint 错误在开发时直接显示在浏览器中，可以使用 lintOnSave: 'error'。
    // 这会强制 eslint-loader 将 lint 错误输出为编译错误


}