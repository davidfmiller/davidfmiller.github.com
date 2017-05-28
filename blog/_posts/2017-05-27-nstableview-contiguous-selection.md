---
layout: post
title:  "NSTableView & Contiguous Row Selection"
date:   2017-05-27 00:00:00 -0700
categories: nstableview contiguous
---

# NSTableView & Contiguous Row Selection

Recent work on [Router](https://readmeansrun.com/router/) requires an [`NSTableView`](https://developer.apple.com/reference/appkit/nstableview) instance to enforce contiguous selection on its rows, ie: allowing multiple row selection but with the restriction that the selected rows must be _sequential_ (should a non-contiguous row be selected it becomes the sole selected row).

After digging around on the internet and coming up empty, I rolled my own solution… feel free to [clone it](https://github.com/davidfmiller/nstableview-contiguous) on [GitHub](https://github.com).


