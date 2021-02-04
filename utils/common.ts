import {Dirent} from "fs";
import * as path from 'path';
import * as fs from 'fs';
/**
 * 深度查找文件集合
 * @param {string} _path 需要查询的路径
 * @param {RegExp} ext 需要过滤的文件名字的正则表达式
 * @returns {string[]} _path路径下所有经过ext测试通过的文件路径集合
 */
export function fileDeps(_path: string, ext: RegExp = /[\S\s]/): string[]{ // Webpack.require.context实现
    // @ts-ignore
    return fs.readdirSync(_path, { withFileTypes: true }).reduce((manifest/* files */: string[], file: Dirent) => {
        const { name }: { name: string } = file;
        if (__filename === path.join(_path, name)) return manifest; // 排除本文件

        if (file.isDirectory()) { // 目录递归
            return manifest.concat(fileDeps(path.resolve(_path, file.name), ext));
        }

        return ext.test(path.extname(name)) ? manifest.concat(path.resolve(_path, name)) : manifest; // 匹配符合规则的文件
    }, <unknown>[]);
}
