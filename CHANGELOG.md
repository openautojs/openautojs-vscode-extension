# Change Log
All notable changes to the "auto-js-vscodeext-fixed" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.



### 0.3.6
优化以下特性：
* 开发文档：支持快捷键`F4`开启显示

### 0.3.5
优化以下特性：
* 优化开发文档非第一次显示速度

### 0.3.4
优化以下特性：
* 修复离线开发文档显示问题
* 减少无相关的日志输出

### 0.3.3
增加以下特性：
* 增加离线开发文档

### 0.3.2
优化以下特性：
* 增加插件自身图标

### 0.3.1
优化以下特性：
* 手机打印日志输出，支持自动滚动，展示最新日志输出信息
* 重启VsCode插件服务后，手机打印日志通道不重复创建

### 0.3.0 
优化以下特性：
* Run Project（运行项目）：优化项目配置project.json中ignore选项处理，提高VsCode到手机的项目传输速度
* Save Project（保存项目）：优化项目配置project.json中ignore选项处理，提高VsCode到手机的项目传输速度
* 支持手机打印输出到VsCode的输出通道面板上，无需在开发人员工具的控制台查看。每一个设备对应一个VsCode输出通道面板

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