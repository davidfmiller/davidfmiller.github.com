---
layout: post
title:  "Text Clippings in the Terminal"
date:   2017-06-13 00:00:00 -0700
categories: terminal macos
---

# Text Clippings in the Terminal

macOS has supported text clippings since OS 9: snippets of text — RTF if appropriate — that can be dragged around your computer and dropped into text fields (or any other view that accepts a string of characters). Creating a clipping is simple: select the desired text with your cursor and then drag the selection to your desktop.

The bad news: prior to [macOS Sierra](https://www.apple.com/macos) the contents of text clippings were stored in difficult-to-parse [resources forks](https://en.wikipedia.org/wiki/Resource_fork), thereby rendering them virtually inaccessible to shell scripts and other UNIX-based utilities unless you wanted to jump through painful hoops to access them.

The goods news: as of 10.12 text clippings are plain old files saved in Apple’s binary [`plist`](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man5/plist.5.html) format, which  can be read from & written to via the [NSDictionary](https://developer.apple.com/documentation/foundation/nsdictionary) class. 

[text-clipping](https://github.com/davidfmiller/bin/blob/master/text-clipping) is a simple [Swift](https://swift.org) script that will echo the plain-text contents of clippings to standard out:

```
$ text-clipping ~/Desktop/hashtags.textClipping
#Z7
#raw
#RPE11
#topset
#wymtm
#blessed
#brocycle
#herniaface
#squatsarefree
#fromwhereilift
#bulkingseason
#ysesucksforlifting
```

[Clone it](https://github.com/davidfmiller/bin/blob/master/text-clipping) on [GitHub](https://github.com/davidfmiller/bin/).