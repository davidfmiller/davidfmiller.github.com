---
layout: post
title:  "ESLint & BBEdit"
date:   2018-01-19 00:00:00 -0700
categories: eslint javascript bbedit applescript
---

# ESLint & BBEdit

In a [previous post](/blog/jshint/bbedit/applescript/2017/04/26/jshint-bbedit.html) I showed how to run [BBEdit]((https://www.barebones.com/products/bbedit/))'s active document through [`jshint`](http://jshint.com). Since then I've made the switch to the newer & shinier [`eslint`](https://eslint.org), and so comes a new AppleScript to lint your JavaScript:

<pre><span></span><span class="cm">(* Pipe eslint output into a BBEdit results window  *)</span>
<span class="k">try</span>
	<span class="k">tell</span> <span class="nb">application</span> <span class="s2">&quot;BBEdit&quot;</span>
		<span class="k">set</span> <span class="nv">mydoc</span> <span class="k">to</span> <span class="nv">file</span> <span class="k">of</span> <span class="p">(</span><span class="na">document</span> <span class="mi">1</span> <span class="k">of</span> <span class="na">window</span> <span class="mi">1</span><span class="p">)</span>
	<span class="k">end</span> <span class="k">tell</span>
	<span class="k">set</span> <span class="nv">posixPath</span> <span class="k">to</span> <span class="nv">POSIX</span> <span class="na">path</span> <span class="k">of</span> <span class="nv">mydoc</span>

	<span class="k">set</span> <span class="nv">cmd</span> <span class="k">to</span> <span class="s2">&quot;/usr/local/bin/node /usr/local/bin/eslint -c ~/.eslintrc.js -f unix &quot;</span> <span class="o">&amp;</span> <span class="p">(</span><span class="nb">quoted form</span> <span class="k">of</span> <span class="nv">POSIX</span> <span class="na">path</span> <span class="k">of</span> <span class="nv">mydoc</span><span class="p">)</span> <span class="o">&amp;</span> <span class="s2">&quot; | /usr/local/bin/bbresults&quot;</span>
	<span class="nb">do shell script</span> <span class="nv">cmd</span>
<span class="k">on</span> <span class="k">error</span>
	<span class="nb">beep</span>
<span class="k">end</span> <span class="k">try</span></pre>

Save the AppleScript under `~/Library/Application Support/BBEdit/Scripts` (create the folder if it doesn't exist), after which you can invoke the script via BBEdit's Scripts menu (Window → Palettes → Scripts) and/or palette.

Install ESLint via...

<pre>⚡ npm i eslint -g</pre>

Grab an ESLint configuration file via...

<pre>⚡ curl "https://raw.githubusercontent.com/davidfmiller/configs/master/doteslintrc.js" > ~/.eslintrc.js</pre>


... and [customize it](https://eslint.org/docs/rules/) to suit your preferences.
