
/// 压缩
// @ts-ignore
import ora from 'ora';
import * as path from 'path';
import { red } from 'colors';
import * as compressing from 'compressing';

export default {
    // alias: '',
    command: 'unmake <compressed-file-path> [decompression-dir-path]',
    description: '解压缩文件',
    action(zipPath: string, desPath: string): void | Promise<void> {
        const _zipPath: string = path.resolve(process.cwd(), zipPath); // 压缩文件路径
        const _zipObject: path.ParsedPath = path.parse(_zipPath);
        const _desPath: string = desPath ?? _zipObject.dir; // 解压文件路径
        const fileType = _zipObject.ext.replace(/^\./, '') as keyof typeof compressing;

        if(!Object.prototype.hasOwnProperty.call(compressing, fileType)){ // 是否符合解压条件
            console.log(red(`当前文件不符合解压规则，支持的解压类型：${Object.keys(compressing)}`));
            process.exit(1);
        }

        const spinner: ora.Ora = ora('正在解压文件').start();
        compressing[fileType].uncompress(_zipPath, _desPath)
            .then((): void => spinner.succeed(`解压成功 -> ${_desPath}`))
            .catch((): void => spinner.fail('解压失败'));
    }
}
