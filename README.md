# What does Jotdown do?
There are two main features that Jotdown aims to achieve:

1. A super-simple **pure JavaScript** answer to contenteditable's shortcomings.
2. A rich text experience that understands Markdown.

## Contenteditable
Ever since the year 2000 with the release of Internet Explorer 5.5, the `contenteditable` attribute was available to web developers.

The reason you would want to use `contenteditable` is for when a plain old `<textarea>` element is not enough. Textareas are plain text only, with no exceptions. If you want to allow user input to have basic formatting, such as bold text, you can not use textareas.

Adding `contenteditable` elements to the page is great. Browsers even include APIs to interact with the formatting, giving developers the ability to code their own toolbars full of buttons, for instance. The problem is that all browsers implement `contenteditable` differently, and there are many bugs and shortfalls associated with using it.

## Rich text and Markdown
In 2004, the Markdown syntax was created by John Gruber as a simple language for marking up formatted text in a plain text document, with the main feature of being human readable.

Human readability of the source markup meant that rich text could finally be inputted into by users via humble `<textarea>`. Surround words with asterisks \*\*like this\*\* to make it bold, add a hash at the start of a line to create a heading, and so on. It was easy to visualise the rich text implementation of the plain text input, so all was good.

Except non-developers didn't like seeing the plain text markup, and needed to see the end product to fully understand what they are typing. Because Markdown transforms to HTML very easily, this lead to a barrage of side-by-side editor-viewer experiences that break every rule of user experience possible. Developers are so used to seeing side-by-side Markdown editors that even to this day modern software applications are still using the technique.

# The problem
If you're in a medium that's capable of displaying a formatted HTML document (like a browser), then there is no benefit to seeing the plain text Markdown version of the document. If you require live editing in this same medium, then there is certainly no benefit to being able to type in plain text Markdown.
It is never useful to show a side-by-side live-edit comparison of your markdown document to the final render. Plus, normal internet users (A.K.A. the client) don't understand stereoscopic editing.

## What's the answer?
Markdown is an extremely useful file format for storing rich text document contents. It is a really simple format that enforces simple formatting, and if you're ever in the need to view it outside of the place it is to be rendered, you can easily infer the formatting from the plain text.

Not everybody will find Markdown inherently intuitive, but once someone knows the Markdown format, another extremely useful feature is its simple-to-type approach, allowing you to format documents using intuitive and easy to remember keystrokes.

If you have the need to see the final rendered document that you're editing (which is an obvious requirement), and you're in any rich-text-capable environment, then there is absolutely no reason whatsoever to show a non-rendered version of the document alongside. This has become the norm in web projects as an almost viable alternative to the WYSIWYG editor, but it must stop!

The most elegant solution is an in-browser rich text editor that stores the document in Markdown format via an ordinary `<textarea>`, but is simply _compatible_ with Markdown — an editor that displays fully formatted text to the writer, but reacts to Markdown formatting while allowing less in-the-know writers to use pretty toolbar buttons for the same purpose.

# How does Jotdown work?
To the developer, Jotdown takes control of an ordinary `<textarea>` element and transforms it into the Jotdown editor. The minimal HTML you need to use Jotdown is as follows:

```html
<!doctype html>
<link rel="stylesheet" href="src/jotdown.css" />
<script src="src/jotdown.js"></script>

<form>
    <textarea name="content" data-jotdown></textarea>
    <button>Save</button>
</form>
```

Notice the use of the `data-jotdown` attribute. This is what JavaScript uses to identify the elements to transform.

To the end user, a text input box is displayed in the browser, with an optional toolbar above it. The toolbar can be set to be visible at all times, never, or only when there is text selected in the editor.

By default, the editor and toolbar are styled as simply as possible to create a functional experience, but without imposing any visual style on the product it is being used in. With some simple CSS, the entire editor and toolbar's look and feel can be transformed to things akin to Medium's text editor, or (if you _really_ want), Microsoft Word.

## What rich text capabilities does Jotdown provide?
Jotdown supports what Markdown supports. This means that fonts, tables, sidebars and justification are out of scope. If you need these features, this isn't the tool for you.

The following formatting features are currently possible:

+ Paragraph content.
+ Headings (h1 through to h6).
+ Emphasising formatting (bold, italic, strikethrough).
+ Hyperlinks.
+ Blockquotes.
+ Code blocks.
+ Indentation.
+ Undo/redo capability.

## How do I save the text, and in what format?
Treat Jotdown as a normal `<textarea>`, and do with it what you would in your typical `<form>` submission development. This might be using HTTP capabilities built into the browser (by submitting the form via GET or POST), or by using XmlHTTPRequests (A.K.A. Ajax) to send the content somewhere.

The value of the original `<textarea>` placed within the page will contain a perfectly formatted Markdown representation of the rich text content.

## What's missing?
Jotdown is still early days, and while the core functionality is being tested, there are plenty of great ideas to implement. These can be viewed, tracked and added to in [Github's issue tracker][issue-tracker]. The top features that would be great to see one day include:

+ Inline image capabilities.
+ File attachments.
+ Handling of pasted-in content.

[issue-tracker]: https://github.com/g105b/jotdown/issues