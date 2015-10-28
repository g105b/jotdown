;document.addEventListener('DOMContentLoaded', function () {

var
	activeEditor = null,
	toolbar = null,

	markdownPatternMap = {
		"block": {
			"h1": "^\\s*#\\s*(\\w+)",
			"h2": "^\\s*##\\s*(\\w+)",
			"h3": "^\\s*###\\s*(\\w+)",
			"h4": "^\\s*####\\s*(\\w+)",
			"h5": "^\\s*#####\\s*(\\w+)",
			"h6": "^\\s*######\\s*(\\w+)",
		},
		"inline": {
			"b": "\\*\\*([^\\*]+)\\*\\*"
		}
	},

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

	attachListeners(editor);
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
	activeEditor = jotdownEditor;

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

function parseMarkdown(node) {
	var
		matchType,
		nodeType,
		regexp,
		originalHTML,
		matches,
		inlineNode,
	$$;

	if(!node) {
		return;
	}

	for(nodeType in markdownPatternMap.block) {
		regexp = new RegExp(markdownPatternMap.block[nodeType]);

		if(node.innerHTML.trim().match(regexp)) {
			originalHTML = node.innerHTML;
			node.innerText = node.innerText.replace(regexp, "$1");
			node = changeNodeType(node, nodeType);
			node.setAttribute("data-original-html", originalHTML);

			setTimeout(function() {
				moveSelection(node.nextElementSibling);
			}, 0);
		}
	}

	for(nodeType in markdownPatternMap.inline) {
		regexp = new RegExp(markdownPatternMap.inline[nodeType]);

		while(matches = node.innerHTML.match(regexp)) {
			inlineNode = document.createElement(nodeType);
			inlineNode.innerText = matches[1];
			// Remove the text:
			node.innerHTML = node.innerHTML.substr(0, matches.index)
				+ inlineNode.outerHTML
				+ node.innerHTML.substr(matches.index + matches[0].length);
		}
	}
}

function attachListeners(editor) {
	var
		observer = new MutationObserver(e_mutate),
	$$;

	observer.observe(editor, {
		childList: true,
		subtree: true,
	});
}

function mutate(mutationRecord) {
	[].forEach.call(mutationRecord.addedNodes, function(node) {
		var
			highestNode = node,
			changed = false,
		$$;

		if(node.nodeName === "#text"
		|| node.nodeName === "BR"
		|| node.nodeName === "B") {
			return;
		}

		if(node.nodeName === "DIV") {
			node = changeNodeType(node, "P");
		}

		if(node.nodeName !== "LI") {
			while(highestNode.parentNode
			&& highestNode.parentNode !== activeEditor
			) {
				// Set highestNode to the ancestor of node that is the child
				// of activeEditor.
				highestNode = highestNode.parentNode;
				changed = true;
			}
		}

		parseMarkdown(node.previousElementSibling);

		if(changed) {
			activeEditor.insertBefore(node, highestNode.nextSibling);
		}

		activeEditor.focus();
		moveSelection(node);
	});
}

function changeNodeType(node, newNodeType) {
	var
		newNodeType = newNodeType.toLowerCase(),
		newNode = document.createElement(newNodeType),
	$$;

	newNode.innerHTML = node.innerHTML;
	node.parentElement.replaceChild(newNode, node);

	return newNode;
}

function moveSelection(node, end) {
	var
		end = !!end,
		range = document.createRange(),
		sel = window.getSelection(),
	$$;

	range.setStart(node, 1);
	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
}

function e_mutate(mutationRecordArray) {
	mutationRecordArray.forEach(mutate);
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