import * as vscode from 'vscode';

var inMarkMode: boolean = false;

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.commands.registerCommand('emacs.enterMarkMode', (context) => {
        var currentPosition: vscode.Position = vscode.window.activeTextEditor.selection.active;
        if (inMarkMode) {
            vscode.window.activeTextEditor.selection = new vscode.Selection(currentPosition, currentPosition);
        }
        inMarkMode = true;
    }));

    context.subscriptions.push(vscode.commands.registerCommand('emacs.exitMarkMode', (context) => {
        if (!inMarkMode) {
            return;
        }
        var currentPosition: vscode.Position = vscode.window.activeTextEditor.selection.active;
        vscode.window.activeTextEditor.selection = new vscode.Selection(currentPosition, currentPosition);
        inMarkMode = false;
    }));

    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorUp',
        (context) => { executeCommand("cursorUp", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorDown',
        (context) => { executeCommand("cursorDown", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorLeft',
        (context) => { executeCommand("cursorLeft", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorRight',
        (context) => { executeCommand("cursorRight", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorHome',
        (context) => { executeCommand("cursorHome", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorEnd',
        (context) => { executeCommand("cursorEnd", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorTop',
        (context) => { executeCommand("cursorTop", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorBottom',
        (context) => { executeCommand("cursorBottom", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorWordLeft',
        (context) => { executeCommand("cursorWordLeft", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.cursorWordRight',
        (context) => { executeCommand("cursorWordRight", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.scrollPageDown',
        (context) => { executeCommand("scrollPageDown", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.scrollPageUp',
        (context) => { executeCommand("scrollPageUp", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.scrollLineDown',
        (context) => { executeCommand("scrollLineDown", context); }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.scrollLineUp',
        (context) => { executeCommand("scrollLineUp", context); }));
}

export function deactivate(context: vscode.ExtensionContext): void {
    console.log("Extension has been deactivated");
}

function executeCommand(command: string, context: any): Thenable<any> {
    if (inMarkMode) {
        command = command + "Select";
    }
    return vscode.commands.executeCommand(command);
}

