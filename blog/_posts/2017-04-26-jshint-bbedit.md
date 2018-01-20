---
layout: post
title:  "JSHint & BBEdit"
date:   2017-04-26 00:00:00 -0700
categories: jshint javascript bbedit applescript
---

# JSHint & BBEdit

[BBEdit](https://www.barebones.com/products/bbedit/)’s [`bbresults`](https://www.barebones.com/support/bbedit/notes-11.6.html) utility makes it easy to pipe output from shell commands into an easy-to-navigate results/search window.

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) developers who still write their code in BBEdit (as opposed to [Sublime](https://www.sublimetext.com), [Atom](https://atom.io), [Textmate](https://macromates.com), [Visual Studio Code](https://code.visualstudio.com) or whatever the text editor du jour is) will find the following [AppleScript](https://developer.apple.com/library/content/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) invaluable:

<script src="https://gist.github.com/davidfmiller/1790b90dfbc7781df757e85ff5cc9ac4.js"></script>

Save the script in `~/Library/Application Support/BBEdit/Scripts` (and you’ll probably want to assign a keyboard shortcut via the Scripts palette, too).
