import * as vscode from 'vscode';

var inMarkMode: boolean = false;
export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.commands.registerCommand('emacs.enterMarkMode', (context) => {
        removeSelection();
        inMarkMode = true;
    }));

    context.subscriptions.push(vscode.commands.registerCommand('emacs.exitMarkMode', (context) => {
        if (!inMarkMode) {
            return;
        }
        removeSelection();
        inMarkMode = false;
    }));

    context.subscriptions.push(vscode.commands.registerCommand('emacs.editor.action.clipboardCopyAction', (context) => {
        return vscode.commands.executeCommand("editor.action.clipboardCopyAction")
            .then(() => {
                if (inMarkMode) {
                    removeSelection()
                    inMarkMode = false;
                }
            });
    }));
    
    var supportedCursorMoves: string[] = ["cursorUp", "cursorDown", "cursorLeft", "cursorRight",
        "cursorHome", "cursorEnd",
        "cursorWordLeft", "cursorWordRight",
        "scrollPageDown", "scrollPageUp",
        "scrollLineDown", "scrollLineUp",
        "cursorTop", "cursorBottom"];
        
     supportedCursorMoves.forEach((cursorMove) => {
        context.subscriptions.push(vscode.commands.registerCommand("emacs."+cursorMove,
            (context) => vscode.commands.executeCommand(inMarkMode? cursorMove+"Select": cursorMove)))
     });
}
   
export function deactivate(context: vscode.ExtensionContext): void {
    console.log("vscode-emacs has been deactivated");
}

function removeSelection(): void {
    var currentPosition: vscode.Position = vscode.window.activeTextEditor.selection.active;
    vscode.window.activeTextEditor.selection = new vscode.Selection(currentPosition, currentPosition);
}
