#!/usr/bin/env node
/// 外层入口文件，用于解析内部ts代码
/// 不通过tsc编译后的方式运行，直接运行ts源代码，便于维护和发布

/// ts-node进行解析使用的`tsconfig.json`文件默认是相对于工作目录`process.cwd()`的，环境变量`TS_NODE_PROJECT`指定`tsconfig.json`文件的位置
process.env.TS_NODE_PROJECT = require('path').resolve(__dirname, 'tsconfig.json');
// 外包装主体代码
module.exports = (() => require('./main.ts') /* 主文件执行 */ )(require('ts-node/register')/* TypeScript.require模块注册 */);
