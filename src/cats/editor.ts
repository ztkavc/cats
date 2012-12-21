
module cats {

class Editor {
	private aceEditor:ACE.Editor;
	private toolTip:ui.ToolTip;
	private autoCompleteView:AutoCompleteView;

	// private rootElement

	constructor(private rootElement:HTMLElement) {

		this.aceEditor = createEditor();
        this.aceEditor.setFontSize("14px");
        this.hide();


        this.toolTip = new ui.ToolTip();
        this.autoCompleteView = new AutoCompleteView(this.aceEditor);

	}


show() {
  rootElement.style.display = "block";
}


hide() {
  rootElement.style.display = "none";
}

setTheme(theme:string) {
	this.aceEditor.setTheme(theme);
}


addCommand(command:ACE.EditorCommand) {
	this.aceEditor.commands.addCommands([command]);
}

// Initialize the editor
private createEditor() {
    var editor:ACE.Editor = ace.edit(this.rootElement);    
    // editor.getSession().setMode("ace/mode/typescript");

    editor.commands.addCommands([
    {
        name:"autoComplete",
        bindKey:"Ctrl-Space",
        exec:this.autoComplete.bind(this)
    },

    {
        name:"save",
        bindKey:"Ctrl-s",
        exec:this.saveFile.bind(this)
    }
    ]);

    var originalTextInput = editor.onTextInput;
    editor.onTextInput = (text) => {
        originalTextInput.call(editor, text);
        if (text === ".") this.autoComplete();
    };

    var elem  = rootElement; // TODo find scroller child
    elem.onmousemove = this.onMouseMove.bind(this);
    elem.onmouseout = () => {this.toolTip.hide()};

    return editor;
}

}


}