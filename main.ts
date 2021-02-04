#!/usr/bin/env ts-node --script-mode --transpile-only --files
// This shebang is not portable.  It only works on Mac

import { satisfies } from 'semver';
import { red } from 'colors';
import * as path from 'path';
import * as Program from 'commander';
import type * as commander from 'commander';

import { fileDeps } from './utils/common';

(async function main(): Promise<void>{
    const { program }: typeof Program = Program;
    const packageConf = await import('./package.json');
    const isVersionValid: boolean = satisfies(process.version, packageConf.engines.node);
    if (!isVersionValid) {
        console.log(red(`你使用的NodeJs版本为${process.version}，即将执行的代码需要${packageConf.engines.node}！\n请升级你的NodeJs版本。`));
        process.exit(1);
    }

    (<commander.Command>program)
        .name?.(<string>packageConf.name)
        .description(<string>packageConf.description)
        .version(<string>packageConf.version);

    for (const module of fileDeps(path.join(__dirname, 'bin'))) {
        const {command, description, action, alias, options = {}} = (await import(module)).default;

        const _options = Object.entries<string>(options);
        const _command: commander.Command = <commander.Command>program.command(<string>command).description(<string>description).action(<(...arg: any) => void>action);
        _command.alias(alias); // 别名设置
        if (!!_options.length)
            _options.forEach(([key, value]: [string, string]) => _command.option(key, value));
        /* program
             .command(command.command)
             .alias(command.alias)
             .description(command.description)
             .option(command.option)
             .action(command.action)*/
    }

    program.parse(<string[]>process.argv); // 参数解析
})()
