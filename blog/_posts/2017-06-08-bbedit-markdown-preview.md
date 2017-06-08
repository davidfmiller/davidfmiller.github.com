---
layout: post
title:  "Styling BBEdit’s Markdown Preview"
date:   2017-06-08 00:00:00 -0700
categories: bbedit markdown css
---

# Styling BBEdit’s Markdown Preview

[BBEdit](http://www.barebones.com/products/bbedit/) has been able to [preview processed Markdown files](http://www.barebones.com/support/bbedit/arch_bbedit86.html) for quite a while now (via the `Markup` → `Preview in BBEdit` menu item). 

What’s not so clear is how to _style_ your filtered Markdown content into markup that doesn’t look like a webpage presented in Netscape 3. Thankfully this situation is easy to rememdy: 

Create the folder `~/Library/Application Support/BBEdit/Preview CSS` (if it doesn’t already exist) and drop in as many stylesheets as you please. These stylesheets will be accessible from BBEdit’s preview window’s CSS popup menu.

The following [man-inspired](https://github.com/davidfmiller/man) [Gist](https://gist.github.com/davidfmiller/613dfeb4d760c159e958d39a33c424b4) is a great start:

<script src="https://gist.github.com/davidfmiller/613dfeb4d760c159e958d39a33c424b4.js"></script>
