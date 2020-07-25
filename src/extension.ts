'use strict';
import * as vscode from 'vscode';
import { AutoJsDebugServer, Device } from './autojs-debug';
import * as oldAutojs from './autojs-debug-old';
import { ProjectTemplate, Project } from './project';
import * as path from 'path';
import * as fs from 'fs'
import { Context } from 'vm';

var server = new AutoJsDebugServer(9317);
var oldServer = new oldAutojs.AutoJsDebugServer(1209);

var recentDevice = null;

server
    .on('connect', () => {
        vscode.window.showInformationMessage('Auto.js server running');
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
    })
    .on('log', log => {
    });

oldServer
    .on('connect', () => {
        console.log('Auto.js server running');
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
    });



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
                'Auto.js Document',
                // webview面板的标题，会展示给用户
                'Auto.js开发文档',
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
            this.loadDocument("index.html");
        } catch (e) {
            console.trace(e)
        }
    }

    private loadDocument(fileName) {
        try {
            let cache = this.documentCache.get(fileName);
            if (!cache) {
                let docRootPath = path.join(_context.extensionPath, "src", "document");
                let resourcePath = path.resolve(docRootPath, fileName);
                let html = fs.readFileSync(resourcePath, 'utf-8');
                // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
                html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
                    if ($2.substring($2.length - 4, $2.length) != 'html') {
                        return $1 + vscode.Uri.file(path.resolve(docRootPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
                    } else {
                        return $1 + $2 + '"';
                    }
                });
                // console.log(html)
                cache = html + 
                `<script>
                    const vscode = acquireVsCodeApi();
                    document.querySelectorAll("a").forEach(e => {
                        if (e) {
                            e.onclick = () =>{
                                if (e.href) {
                                    let target = e.href.substring(e.href.lastIndexOf("/"), 
                                        (e.href.lastIndexOf("#") < 0 ? e.href.length : e.href.lastIndexOf("#")));
                                    let cur = location.href.substring(location.href.lastIndexOf("/"), 
                                        (location.href.lastIndexOf("#") < 0 ? location.href.length : location.href.lastIndexOf("#")));
                                    if (target != cur && e.href.indexOf("http") < 0) {
                                        let href= e.href.substring(e.href.lastIndexOf("/"), (e.href.lastIndexOf("#") < 0 ? e.href.length : e.href.lastIndexOf("#")));
                                        vscode.postMessage({href: e.href});
                                    } else {
                                        // console.log("内部跳转：" + e.href)
                                    }
                                }
                            }
                        }
                    })
                </script>`;
                this.documentCache.set(fileName, cache);
            }
            this.documentViewPanel.webview.html = cache;
        } catch (e) {
            console.trace(e);
        }
    }

    startServer() {
        server.listen();
        oldServer.listen();
    }

    stopServer() {
        server.disconnect();
        oldServer.disconnect();
        vscode.window.showInformationMessage('Auto.js server stopped');
    }

    run() {
        this.runOn(server);
        this.runOn(oldServer);
    }

    stop() {
        server.sendCommand('stop', {
            'id': vscode.window.activeTextEditor.document.fileName,
        });
        oldServer.send({
            'type': 'command',
            'view_id': vscode.window.activeTextEditor.document.fileName,
            'command': 'stop',
        })
    }

    stopAll() {
        server.sendCommand('stopAll');
        oldServer.send({
            'type': 'command',
            'command': 'stopAll'
        })
    }

    rerun() {
        let editor = vscode.window.activeTextEditor;
        server.sendCommand('rerun', {
            'id': editor.document.fileName,
            'name': editor.document.fileName,
            'script': editor.document.getText()
        });
        oldServer.send({
            'type': 'command',
            'command': 'rerun',
            'view_id': editor.document.fileName,
            'name': editor.document.fileName,
            'script': editor.document.getText()
        });
    }

    runOnDevice() {
        this.selectDevice(device => this.runOn(device));
    }

    selectDevice(callback) {
        let devices: Array<Device | oldAutojs.Device> = server.devices;
        devices = devices.concat(oldServer.devices);
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

    runOn(target: AutoJsDebugServer | Device | oldAutojs.Device | oldAutojs.AutoJsDebugServer) {
        let editor = vscode.window.activeTextEditor;
        if (target instanceof oldAutojs.Device || target instanceof oldAutojs.AutoJsDebugServer) {
            target.send({
                'type': 'command',
                'command': 'run',
                'view_id': editor.document.fileName,
                'name': editor.document.fileName,
                'script': editor.document.getText()
            })
        } else {
            target.sendCommand('run', {
                'id': editor.document.fileName,
                'name': editor.document.fileName,
                'script': editor.document.getText()
            })
        }

    }

    save() {
        this.saveTo(server);
    }

    saveToDevice() {
        this.selectDevice(device => this.saveTo(device));
    }

    saveTo(target: AutoJsDebugServer | Device | oldAutojs.Device) {
        let editor = vscode.window.activeTextEditor;
        if (target instanceof oldAutojs.Device || target instanceof oldAutojs.AutoJsDebugServer) {
            target.send({
                'command': 'save',
                'type': 'command',
                'view_id': editor.document.fileName,
                'name': editor.document.fileName,
                'script': editor.document.getText()
            })
        } else {
            target.sendCommand('save', {
                'id': editor.document.fileName,
                'name': editor.document.fileName,
                'script': editor.document.getText()
            })
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

    sendProjectCommand(command: string) {
        let folders = vscode.workspace.workspaceFolders;
        if(!folders || folders.length == 0){
            vscode.window.showInformationMessage("请打开一个项目的文件夹");
            return null;
        }
        let folder = folders[0].uri;
        if(!server.project || server.project.folder != folder){
            server.project && server.project.dispose();
            server.project = new Project(folder);
        }
        server.sendProjectCommand(folder.fsPath, command);
    }
    saveProject() {
        this.sendProjectCommand("save_project");
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