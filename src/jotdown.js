;document.addEventListener('DOMContentLoaded', function () {

var
	activeEditor = null,
	toolbar = null,

	toolbarCommandMap = {
		"bold": "Bold",
		"italic": "Italic",
		"strikethrough": "Strike through",
		"link": "Link",

		"p": "Paragraph",
		"h1": "Heading 1",
		"h2": "Heading 2",
		"h3": "Heading 3",
		"h4": "Heading 4",
		"h5": "Heading 5",
		"h6": "Heading 6",
		
		"blockquote": "Quote",
		"pre": "Code",
		"insertUnorderedList": "Bullets",
		"insertOrderedList": "Numbers",
		"indent": "Incease indent",
		"outdent": "Decrease indent",

		"undo": "Undo",
		"redo": "Redo",
	},

	// These items will start new containers:
	toolbarCommandSpacers = [
		"p",
		"quote",
		"undo",
	],

	toolbarCommandBlocks = [
		"p",
		"h1", "h2", "h3", "h4", "h5", "h6", 
		"blockquote",
		"code",
		"ul",
		"ol",
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
	jotdownEditor.addEventListener("focus", e_focus_editor);

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

		button.addEventListener("click", e_click_button);

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

function e_click_button(e) {
	e.preventDefault();

	var 
		command = this.getAttribute("data-command"),
	$$;

	this.blur();

	if(toolbarCommandBlocks.indexOf(command) >= 0) {
		document.execCommand("formatBlock", false, command);
	}
	else {
		document.execCommand(command);		
	}

	activeEditor.focus();
}

function e_focus_editor(e) {
	activeEditor = this;
}

});//#