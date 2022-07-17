# Change Log

All notable changes to the "auto-js-vscodeext-fixed" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.



### 1.108.0

优化以下特性：

- [wilinz](https://github.com/wilinz)  增加手动连接ADB命令和手动关闭连接命令

- [wilinz](https://github.com/wilinz) 修复&优化


### 1.107.0

优化以下特性：

-  [wilinz](https://github.com/wilinz)  修改连接不上的bug


### 1.105.0

优化以下特性：

-  修改名字，修改描述

### 1.104.0

优化以下特性：

-  [wilinz](https://github.com/wilinz) 修复一些bug
- 增加license


### 1.103.0

优化以下特性：

-  [wilinz](https://github.com/wilinz) 增加adb方式进行连接、二维码等
- 修改一些语法错误问题
- 不能自动运行的bug


### 1.102.0

优化以下特性：

-  内部测试，修正一些依赖版本，调整代码


### 1.101.0

优化以下特性：

- 服务器多 ip 无法显示所有 ip 问题
- 命令行分组提示 区分 autojs

### 1.100.0

优化以下特性：

- 修复创建新项目时候，非空文件夹中 main.js 和 project.json 被覆盖的问题

### 1.99.0

优化以下特性：

- 修复 1.98 版本中，文件名丢失的 bug

### 1.98.0

优化以下特性：

- 自动补全功能

### 1.97.3

优化以下特性：

- 修复 bug 保存文件名后缀为 js 的问题

### 1.97.2

优化以下特性：

- vscode 中使用统一文档

### 0.3.14

优化以下特性：

- 兼容应用商店版
- 修复 UI 闪退问题

### 0.3.13

优化以下特性：

- 兼容 webpack 5
- 功能冲突问题

### 0.3.12

优化以下特性：

- 增加功能（watch 模式）下 rerun 为先发 stop，再发 run 命令的模式，来修复 rerun 造成 app 闪退问题

### 0.3.11

优化以下特性：

- 增加功能（watch 模式）：根据项目配置，脚本保存后，自动重新运行脚本或保存项目到设备,
- 完全实现工程化，编译、混淆、打包、热更，项目自动保存到手机、运行脚本。
- js 文件 右键， 保存脚本 (此处并非保存到项目下,而是在通用目录中)
- 请结合 webpack-autojs cli 自动化工具，开发一行代码，不用按 f5，来回叨叨了 https://github.com/kkevsekk1/webpack-autojs

### 0.3.10

优化以下特性：

- 文件夹,右键菜单中添加‘保存项目到设备’； 结合 webpack 编译，混淆打包，保存到手机一气呵成
- js 文件 右键--运行脚本，js 文件中，右上角 点击运行脚本
- 结合 webpack， https://github.com/kkevsekk1/webpack-autojs 项目，可以做到高度工程化。
- 下一个版本将增加功能（watch 模式）：脚本保存后自动完成，热更新编译、混淆、打包、自动到手机、运行脚本。

### 0.3.8

优化以下特性：

- 开发文档： 修复 HTTP 文档打不开

### 0.3.7

优化以下特性：

- 开启服务(Start Server): 支持显示本地 IP，免去手动查询当前 vscode 运行机器所属 IP
- 开发文档: 优化重复点击”索引“菜单无跳转效果问题
  PS: 由于官方文档在小屏幕下没有显示比较有效的导航引导，建议配合一下快捷键使用，提高跳转效率
  - `Ctrl + Home`(到页面顶部)
  - `Ctrl + End`(到页面底部)
  - `PageUp`(上一页)
  - `PageDown`(下一页)

### 0.3.6

优化以下特性：

- 开发文档：支持快捷键`F4`开启显示

### 0.3.5

优化以下特性：

- 优化开发文档非第一次显示速度

### 0.3.4

优化以下特性：

- 修复离线开发文档显示问题
- 减少无相关的日志输出

### 0.3.3

增加以下特性：

- 增加离线开发文档

### 0.3.2

优化以下特性：

- 增加插件自身图标

### 0.3.1

优化以下特性：

- 手机打印日志输出，支持自动滚动，展示最新日志输出信息
- 重启 VsCode 插件服务后，手机打印日志通道不重复创建

### 0.3.0

优化以下特性：

- Run Project（运行项目）：优化项目配置 project.json 中 ignore 选项处理，提高 VsCode 到手机的项目传输速度
- Save Project（保存项目）：优化项目配置 project.json 中 ignore 选项处理，提高 VsCode 到手机的项目传输速度
- 支持手机打印输出到 VsCode 的输出通道面板上，无需在开发人员工具的控制台查看。每一个设备对应一个 VsCode 输出通道面板

<!-- | 功能 | 快捷键 | 说明 |
| ---- | ---- | ---- |
| 打开文档(Open Document) | `F4` | 打开Auto.js离线开发文档 |
| 开启服务(Start Server) |  | 启动插件服务。之后在确保手机和电脑在同一区域网的情况下，在Auto.js的侧拉菜单中使用连接电脑功能连接 |
| 停止服务(Stop Server) |  | 停止插件服务 |
| 运行脚本(Run) | `F5` | 运行当前编辑器的脚本。如果有多个设备连接，则在所有设备运行 |
| 重新运行(Rerun) | `Ctrl+Shift+F5`<br/>`Cmd+Shift+F5` | 停止当前文件对应的脚本并重新运行。如果有多个设备连接，则在所有设备重新运行 |
| 停止当前脚本(Stop) | `Shift+F5` | 停止当前文件对应的脚本。如果有多个设备连接，则在所有设备停止 |
| 停止所有脚本(Stop All) |  | 停止所有正在运行的脚本。如果有多个设备连接，则在所有设备运行所有脚本 |
| 保存到所有设备(Save) | `Ctrl+Shift+S`<br/>`Cmd+Shift+S` | 保存当前文件到手机的脚本默认目录（文件名会加上前缀remote)。如果有多个设备连接，则在所有设备保存 |
| 在指定设备运行脚本(Run On Device) | `Ctrl+F5`<br/>`Cmd+F5` | 弹出设备菜单并在指定设备运行脚本 |
| 保存到指定设备(Save On Device) |  | 弹出设备菜单并在指定设备保存脚本 |
| 新建项目(New Project) |  | 选择一个空文件夹（或者在文件管理器中新建一个空文件夹），将会自动创建一个项目 |
| 运行项目(Run Project) |  | 运行一个项目，需要Auto.js 4.0.4Alpha5以上支持 |
| 保存项目到设备(Save Project) |  | 保存一个项目，需要Auto.js 4.0.4Alpha5以上支持 | -->
