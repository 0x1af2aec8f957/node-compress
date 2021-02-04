/// 解压缩
import {destType, sourceType} from "compressing";
// @ts-ignore
import ora from 'ora';
import * as path from 'path';
import * as fs from 'fs';
import { red } from 'colors';
import * as compressing from 'compressing';

export default {
    // alias: '',
    command: 'make [decompression-dir-path] [compressed-file-path]',
    description: '压缩文件',
    options: {
        '-e, --ext <file-type>': `压缩文件类型<${Object.keys(compressing)}>`
    },
    action(decompressionPath: string, compressedPath: string, options: {ext: string}): void | Promise<void> {
        const _decompressionPath: string = path.resolve(process.cwd(), decompressionPath ?? ''); // 待压缩文件路径
        const _decompressionObject: path.ParsedPath = path.parse(_decompressionPath);
        const ext = (options.ext ?? 'zip') as keyof typeof compressing; // 传入的文件类型
        const fileType = `.${ext}`; // 需要使用的文件后缀
        const _compressedPath = path.resolve(compressedPath ?? _decompressionObject.dir, _decompressionObject.name + fileType); // 压缩文件存放路径

        if(!Object.prototype.hasOwnProperty.call(compressing, ext)){ // 是否符合压缩文件条件
            console.log(red(`当前文件不符合压缩规则，支持的压缩类型：${Object.keys(compressing)}`));
            process.exit(1);
        }

        // @ts-ignore
        const func: (source: sourceType, dest: destType, opts?: any) => Promise<void> = fs.lstatSync(_decompressionPath).isFile() ? compressing[ext].compressFile : compressing[ext].compressDir;
        const spinner: ora.Ora = ora('正在压缩文件').start();

        func(_decompressionPath, _compressedPath)
            .then((): void => spinner.succeed(`压缩成功 -> ${_compressedPath}`))
            .catch((): void => spinner.fail('压缩失败'));
    }
}
