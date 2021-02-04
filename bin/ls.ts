// @ts-ignore
import tree from 'tree-node-cli';
import * as path from 'path';

export default {
    // alias: '',
    command: 'ls [dirname]',
    description: '列出目录信息',
    options: {
        '-a, --allFiles': '打印所有文件(包含隐藏文件)',
        '-df, --dirsFirst': '在文件之前列出目录',
        '-do, --dirsOnly': '仅列出目录',
        '-e, --exclude <dirname>': '排除指定的目录或文件',
        '-md, --maxDepth': '目录树的最大显示深度',
        '-rs, --reverse': '以相反的字母顺序对输出进行排序',
        '-t, --trailingSlash': '在目录后面添加斜杠',
    },
    action(_path: string = process.cwd(), {exclude, ...options}: {
        allFiles: boolean,
        dirsFirst: boolean,
        dirsOnly: boolean,
        exclude: string,
        maxDepth: number,
        reverse: boolean,
        trailingSlash: boolean
    }): void | Promise<void> {
        console.log(
            tree(path.resolve(process.cwd(), _path),
                Object.assign(options, {
                    exclude: [new RegExp(exclude ?? /[^\S\s]/)]
                })
            ));
    }
}
