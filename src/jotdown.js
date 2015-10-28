;document.addEventListener('DOMContentLoaded', function () {

var
	activeEditor = null,
$$;

(function go() {
	var
		textareaList = document.querySelectorAll("textarea[data-jotdown]"),
	$$;

	[].forEach.call(textareaList, convertTextarea);
})();

function convertTextarea(textarea) {
	var 
		jotdownElement = createJotdown(textarea),
	$$;

	// Create part two of the two-way element link.
	textarea.jotdownElement = jotdownElement;
}

function createJotdown(textarea) {
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

});//#