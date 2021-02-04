/// 外层入口文件，用于解析内部ts代码
/// 不通过tsc编译后的方式运行，直接运行ts源代码，便于维护和发布
module.exports = (() => require('./main.ts') /* 主文件执行 */ )(require('ts-node/register')/* TypeScript.require模块注册 */);
