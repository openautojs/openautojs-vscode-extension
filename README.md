# OpenAutojs-VSCodeExt
OpenAutojs Visual Studio Code的插件。可以让Visual Studio Code支持[OpenAutojs](https://github.com/openautojs/openautojs)开发。

本插件不能和其他Autojs插件同时启用，因为端口会冲突！

[源码仓库](https://github.com/openautojs/openautojs-vscode-extension)

## Install

在VS Code中菜单"查看"->"扩展"->输入"Autox.js"搜索，即可看到"Autox.js-VSCodeExt"插件，安装即可。插件的更新也可以在这里更新。

## Features

* 在VS Code的开发者工具实时显示Auto.js的日志与输出
* 在VS Code命令中增加Run, Stop, Rerun, Stop all等选项。可以在手机与电脑连接后把vscode编辑器中的脚本推送到AutoJs中执行，或者停止AutoJs中运行的脚本。
* 在Autox.js扫码连接电脑
* 通过数据线(ADB)连接电脑

## Usage

### Step 1
按 `Ctrl+Shift+P` 或点击"查看"->"命令面板"可调出命令面板，输入 `Autox.js` 可以看到几个命令，移动光标到命令`Auto.js Autox,js: Start All Server`，按回车键执行该命令。

如果你想使用数据线连接电脑，但是你调用命令后，VS Code右下角没有显示 _"ADB: Tracking started"_ ，你需要先启动或安装ADB服务，启动命令：```adb start-server```。下载页面：[ADB(中国站)](https://developer.android.google.cn/studio/releases/platform-tools) 或 [ADB(国际站)](https://developer.android.com/studio/releases/platform-tools)，然后在adb所在的目录运行```./adb start-server```。

此时VS Code会在右下角显示 _"Auto.js server running..."_ ，即开启服务成功。

### Step 2
#### 1. 无线连接：
将手机连*接到电脑启用的Wifi或者同一*局域网中。在[Autox.js](https://github.com/kkevsekk1/AutoX)的侧拉菜单中启用调试服务，并输入VS Code右下角显示的IP地址，等待连接成功。你也可以点击VS Code右下角"Auto.js server running..."通知的下方按钮 _"Show QR code"_ 或按 `Ctrl+Shift+P` 搜索执行`Show qr code`命令，然后用[Autox.js](https://github.com/kkevsekk1/AutoX)扫码连接。

#### 2. 通过数据线连接(ADB)：
如要在通过 USB 连接的设备上使用 adb，您必须在设备的系统设置中启用 USB 调试（位于开发者选项下）。

在搭载 Android 4.2 及更高版本的设备上，“开发者选项”屏幕默认情况下处于隐藏状态。如需将其显示出来，请依次转到设置 > 关于手机，然后点按版本号七次。返回上一屏幕，在底部可以找到开发者选项。

在某些设备上，“开发者选项”屏幕所在的位置或名称可能有所不同。

在确保手机已经在开发者选项中打开USB调试后，在[Autox.js](https://github.com/kkevsekk1/AutoX)的侧拉菜单中启用ADB调试，再使用数据线连接电脑，插件会自动识别设备。

### Step 3
之后就可以在电脑上编辑JavaScript文件并通过命令`Run`或者按键`F5`在手机上运行了。

## Commands

按 `Ctrl+Shift+P` 或点击"查看"->"命令面板"可调出命令面板，输入 `Auto.js` 可以看到几个命令：
* 开启服务并监听ADB设备(Start all server: 相当于同时调用(Start Server)和(Start track adb devices)
* 停止服务并停止监听ADB设备(Stop all server)
* 开启服务(Start Server)： 启动插件服务。之后在确保手机和电脑在同一区域网的情况下，在Auto.js的侧拉菜单中使用连接电脑功能连接
* 停止服务(Stop Server)： 停止插件服务
* 开始监听ADB设备(Start track adb devices): 开启后会自动连接ADB设备
* 停止监听ADB设备(Stop track adb devices)
* 手动连接ADB设备(Manually connect adb device)
* 手动关闭设备连接(Manually disconnect device)
* 打开文档(Open Document)： 打开Auto.js开发文档
* 显示服务端二维码(Show qr code): 显示服务端二维码，之后可用客户端扫码连接
* 显示服务端ip地址(Show server address)
* 运行脚本(Run)： 运行当前编辑器的脚本。如果有多个设备连接，则在所有设备运行
* 重新运行(Rerun)： 停止当前文件对应的脚本并重新运行。如果有多个设备连接，则在所有设备重新运行
* 停止当前脚本(Stop)： 停止当前文件对应的脚本。如果有多个设备连接，则在所有设备停止
* 停止所有脚本(Stop All)： 停止所有正在运行的脚本。如果有多个设备连接，则在所有设备运行所有脚本
* 保存到所有设备(Save)： 保存当前文件到手机的脚本默认目录（文件名会加上前缀remote)。如果有多个设备连接，则在所有设备保存
* 在指定设备运行脚本(Run On Device)： 弹出设备菜单并在指定设备运行脚本
* 保存到指定设备(Save On Device)： 弹出设备菜单并在指定设备保存脚本
* 新建项目(New Project)： 选择一个空文件夹（或者在文件管理器中新建一个空文件夹），将会自动创建一个项目
* 运行项目(Run Project)： 运行一个项目，需要Auto.js 4.0.4Alpha5以上支持
* 保存项目到设备(Save Project)： 保存一个项目，需要Auto.js 4.0.4Alpha5以上支持

以上命令一些有对应的快捷键，参照命令后面的说明即可。

### For more information

* [Github repo](https://github.com/openautojs/openautojs-vscode-extension)

**Enjoy!**
