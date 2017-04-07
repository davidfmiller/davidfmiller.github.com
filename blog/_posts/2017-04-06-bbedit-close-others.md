---
layout: post
title:  "Close All Other Documents in BBEdit's Window"
date:   2017-04-06 00:00:00 -0700
categories: bbedit applescript
---

# Close All Other Documents in BBEdit's Window

A simple [AppleScript](https://developer.apple.com/library/content/documentation/AppleScript/Conceptual/AppleScriptX/AppleScriptX.html) to close all other documents (ie: everything *except* for the document you’re currently editing) in the front-most [BBEdit](http://www.barebones.com/products/bbedit/index.html) window:

<script src="https://gist.github.com/davidfmiller/b152db1e5e3b0e4f1e87d048cb9f138b.js"></script>

Copy, paste, & save it as a file in `~/Library/Application Support/BBEdit/Scripts`, where you’ll be able to invoke it via BBEdit’s Scripts palette (`Window → Palettes → Scripts`) or via the `Scripts` menu (whose visibility can be toggled on or off in the Preferences window’s `Menus & Shortcuts` pane).
