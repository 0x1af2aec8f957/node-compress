#### node-compress
> node 命令行解压缩工具,依赖于[npm-compressing](https://github.com/node-modules/compressing)。

#### 安装

```bash
npm install -g node-reduce # 全局
npm install node-reduce -D # 局部
```

#### 使用

> 通过在具体的命令后面加 `-h` 参数获取命令行参数及帮助使用说明
```bash
node-compress -h # 获取帮助文档
node-compress ls # 列出当前文件夹树状结构
node-compress ls -h # 获取ls子命令帮助文档，其余命令类似
node-compress make # 压缩当前目录为zip格式的压缩包文件
node-compress unmake ./test.zip # 解压当前目录下test.zip文件到当前目录中
```
