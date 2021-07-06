'use strict';
import * as vscode from 'vscode';
import { AutoJsDebugServer, Device } from './autojs-debug';
import { ProjectTemplate, Project } from './project';
import * as path from 'path';
import * as fs from 'fs'

var server = new AutoJsDebugServer(9317);
var recentDevice = null;
server
    .on('connect', () => {
        vscode.window.showInformationMessage(`Auto.js server running on ${server.getIPAddress()}:${server.getPort()}`);
    })
    .on('new_device', (device: Device) => {
        var messageShown = false;
        var showMessage = () => {
            if (messageShown)
                return;
            vscode.window.showInformationMessage('New device attached: ' + device);
            messageShown = true;
        };
        setTimeout(showMessage, 1000);
        device.on('data:device_name', showMessage);
        // device.send("hello","打开连接");
    }).on('cmd', (cmd: String, url: String) => {
        switch (cmd) {
            case "save":
                extension.saveProject(url);
                break;
            case "rerun":
                extension.stopAll();
                setTimeout(function () {
                    extension.run(url);
                }, 1000);
                break;
            default:
                break;
        }
    })





class Extension {
    private documentViewPanel: any = undefined;
    private documentCache: Map<string, string> = new Map<string, string>();
    openDocument() {
        if (this.documentViewPanel) {
            this.documentViewPanel.reveal((vscode.ViewColumn as any).Beside);
        } else {
            // 1.创建并显示Webview
            this.documentViewPanel = (vscode.window as any).createWebviewPanel(
                // 该webview的标识，任意字符串
                'Autox.js Document',
                // webview面板的标题，会展示给用户
                'Autox.js开发文档',
                // webview面板所在的分栏
                (vscode.ViewColumn as any).Beside,
                // 其它webview选项
                {
                    // Enable scripts in the webview
                    enableScripts: true
                }
            );
            // Handle messages from the webview
            this.documentViewPanel.webview.onDidReceiveMessage(message => {
                // console.log('插件收到的消息：' + message.href);
                let href = message.href.substring(message.href.indexOf("\/electron-browser\/") + 18);
                // console.log("得到uri：" + href)
                this.loadDocument(href)
            }, undefined, _context.subscriptions);
            this.documentViewPanel.onDidDispose(() => {
                this.documentViewPanel = undefined;
            },
                undefined,
                _context.subscriptions
            );
        }
        try {
            // 默认加载首页
            this.loadDocument("http://doc.autoxjs.com/#/");
        } catch (e) {
            console.trace(e)
        }
    }

    private loadDocument(url) {
        try {
            let cache = this.documentCache.get(url);
            if (!cache) {
                cache = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
                    <meta content="portrait" name="x5-orientation">
                    <meta content="true" name="x5-fullscreen">
                    <meta content="portrait" name="screen-orientation">
                    <meta content="yes" name="full-screen">
                    <meta content="webkit" name="renderer">
                    <meta content="IE=Edge" http-equiv="X-UA-Compatible">
                    <title>微信读书</title>
                    <style>
                    html,body,iframe{
                        width:100%;
                        height:100%;
                        border:0;
                        overflow: hidden;
                    }
                    </style>
                </head>
                <body>
                    <iframe src="`+ url + `"/>
                </body>
                </html>`;
                this.documentCache.set(url, cache);
            }
            this.documentViewPanel.webview.html = cache;
        } catch (e) {
            console.trace(e);
        }
    }

    startServer() {
        server.listen();
    }

    stopServer() {
        server.disconnect();
        vscode.window.showInformationMessage('Auto.js server stopped');
    }

    run(url?) {
        this.runOrRerun('run', url);
    }
    stop() {
        server.sendCommand('stop', {
            'id': vscode.window.activeTextEditor.document.fileName,
        });

    }

    stopAll() {
        server.sendCommand('stopAll');

    }
    rerun(url?) {
        this.runOrRerun('rerun', url);

    }
    runOrRerun(cmd, url?) {
        console.log("url-->", url);
        let text = "";
        let filename = null;
        if (url != null) {
            let uri = vscode.Uri.parse(url);
            filename = uri.fsPath;
            console.log("fileName-->", filename);
            try {
                text = fs.readFileSync(filename, 'utf8');
            } catch (error) {
                console.error(error);
            }
        } else {
            let editor = vscode.window.activeTextEditor;
            console.log("dfn", editor.document.fileName);
            filename = editor.document.fileName;
            text = editor.document.getText();
        }
        server.sendCommand(cmd, {
            'id': filename,
            'name': filename,
            'script': text
        });
    }

    runOnDevice() {
        this.selectDevice(device => this.runOn(device));
    }
    selectDevice(callback) {
        let devices: Array<Device> = server.devices;
        if (recentDevice) {
            let i = devices.indexOf(recentDevice);
            if (i > 0) {
                devices = devices.slice(0);
                devices[i] = devices[0];
                devices[0] = recentDevice;
            }
        }
        let names = devices.map(device => device.toString());
        vscode.window.showQuickPick(names)
            .then(select => {
                let device = devices[names.indexOf(select)];
                recentDevice = device;
                callback(device);
            });
    }
    runOn(target: AutoJsDebugServer | Device) {
        let editor = vscode.window.activeTextEditor;
        if (false) {
        } else {
            target.sendCommand('run', {
                'id': editor.document.fileName,
                'name': editor.document.fileName,
                'script': editor.document.getText()
            })
        }

    }

    save(url?) {
        this.saveTo(server, url);
    }
    saveToDevice() {
        this.selectDevice(device => this.saveTo(device));
    }

    saveTo(target: AutoJsDebugServer | Device, url?) {
       
        let text = "";
        let filename = "";
        if (null != url) {
            let uri = vscode.Uri.parse(url);
            filename = uri.fsPath;
            console.log("fileName-->", filename);
            try {
                text = fs.readFileSync(filename, 'utf8');
            } catch (error) {
                console.error(error);
            }
        } else {
            let editor = vscode.window.activeTextEditor;
            filename = editor.document.fileName;
            text = editor.document.getText();
        }
        console.log("url-->", filename);
        try {
          target.sendCommand('save', {
            'id': filename,
            'name': filename,
            'script': text
        })
        } catch (error) {
          console.error(error);
        }
  

    }

    newProject() {
        vscode.window.showOpenDialog({
            'canSelectFiles': false,
            'canSelectFolders': true,
            'openLabel': '新建到这里'
        }).then(uris => {
            if (!uris || uris.length == 0) {
                return;
            }
            return new ProjectTemplate(uris[0])
                .build();
        }).then(uri => {
            vscode.commands.executeCommand("vscode.openFolder", uri);
        });
    }
    runProject() {
        this.sendProjectCommand("run_project");
    }
    sendProjectCommand(command: string, url?) {
        console.log("url-->", url);
        let folder = null;
        if (url == null) {
            let folders = vscode.workspace.workspaceFolders;
            if (!folders || folders.length == 0) {
                vscode.window.showInformationMessage("请打开一个项目的文件夹");
                return null;
            }
            folder = folders[0].uri;
        } else {
            folder = vscode.Uri.parse(url);
        }
        console.log("folder-->", folder);
        if (!server.project || server.project.folder != folder) {
            server.project && server.project.dispose();
            server.project = new Project(folder);
        }
        if (!server.project || server.project.folder != folder) {
            server.project && server.project.dispose();
            server.project = new Project(folder);
        }
        server.sendProjectCommand(folder.fsPath, command);
    }
    saveProject(url?) {
        this.sendProjectCommand("save_project", url);
    }
};


let _context: any;
const commands = ['openDocument', 'startServer', 'stopServer', 'run', 'runOnDevice', 'stop', 'stopAll', 'rerun', 'save', 'saveToDevice', 'newProject',
    'runProject', 'saveProject'];
let extension = new Extension();

export function activate(context: vscode.ExtensionContext) {
    console.log('extension "auto-js-vscodeext-fixed" is now active.');
    commands.forEach((command) => {
        let action: Function = extension[command];
        context.subscriptions.push(vscode.commands.registerCommand('extension.' + command, action.bind(extension)));
        _context = context;
    })
}

export function deactivate() {
    server.disconnect();
}
