---
layout: post
title:  "ESLint & BBEdit"
date:   2018-01-19 00:00:00 -0700
categories: eslint bbedit applescript
---

# ESLint & BBEdit

In a [previous post](/blog/jshint/bbedit/applescript/2017/04/26/jshint-bbedit.html) I showed how to run [BBEdit]((https://www.barebones.com/products/bbedit/))'s active document through [`jshint`](http://jshint.com). Since then I've made the switch to the newer & shinier [`eslint`](https://eslint.org), and so comes a new AppleScript to lint your JavaScript:

<script src="https://gist.github.com/davidfmiller/436c5e60a9a98f6adc31ce1ee008f332.js"></script>

Save the AppleScript under `~/Library/Application Support/BBEdit/Scripts` (create the folder if it doesn't exist), after which you can invoke the script via BBEdit's Scripts menu and/or palette.


Install ESLint via...

```
⚡ npm i eslint -g
```

Grab an ESLint configuration file via...

```
curl "https://raw.githubusercontent.com/davidfmiller/configs/master/doteslintrc.js" > ~/.eslintrc.js
```

... and [customize it](https://eslint.org/docs/rules/) to suit your preferences.
