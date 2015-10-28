;document.addEventListener('DOMContentLoaded', function () {

var
	activeEditor = null,
	toolbar = null,

	toolbarCommandMap = {
		"bold": "Bold",
		"italic": "Italic",
		"strikethrough": "Strike through",
		"link": "Link",

		"h1": "Heading 1",
		"h2": "Heading 2",
		"h3": "Heading 3",
		"h4": "Heading 4",
		"h5": "Heading 5",
		"h6": "Heading 6",
		"p": "Paragraph",
		
		"quote": "Quote",
		"code": "Code",
		"ul": "Bullets",
		"ol": "Numbers",
		"increaseIndent": "Incease indent",
		"decreaseIndent": "Decrease indent",

		"undo": "Undo",
		"redo": "Redo",
	},

	// These items will start new containers:
	toolbarCommandSpacers = [
		"h1",
		"quote",
		"undo",
	],

$$;

(function go() {
	var
		textareaList = document.querySelectorAll("textarea[data-jotdown]"),
	$$;

	[].forEach.call(textareaList, convertTextarea);
})();

function convertTextarea(textarea) {
	var 
		editor = createEditor(textarea),
		toolbar = createToolbar(editor);
	$$;

	// Create the two-way element links.
	editor.jotdownToolbar = toolbar;
	toolbar.jotdownEditor = editor;
	textarea.jotdownEditor = editor;
}

function createEditor(textarea) {
	var
		jotdownEditor = document.createElement("jotdown-editor"),
		jotdownToolbar = document.createElement("jotdown-toolbar"),
		range,
		selection,
	$$;

	// Create part one of the two-way element link.
	jotdownEditor.textarea = textarea;
	textarea.parentNode.insertBefore(jotdownEditor, textarea);

	jotdownEditor.innerHTML = textarea.value;
	jotdownEditor.setAttribute("contenteditable", true);

	if(textarea.hasAttribute("autofocus")) {
		jotdownEditor.focus();
	}

	return jotdownEditor;
}

function createToolbar(editor) {
	var
		toolbar = document.createElement("jotdown-toolbar"),
		separator,
		command,
		button,
	$$;

	for(command in toolbarCommandMap) {
		button = document.createElement("button");
		button.textContent = toolbarCommandMap[command];
		button.title = toolbarCommandMap[command];
		button.setAttribute("data-command", command);

		if(!separator
		|| toolbarCommandSpacers.indexOf(command) >= 0) {
			separator = document.createElement("div");
			toolbar.appendChild(separator);
		}

		separator.appendChild(button);
	}

	toolbar.jotdownEditor = editor;

	editor.parentNode.insertBefore(toolbar, editor);
	return toolbar;
}

});//#