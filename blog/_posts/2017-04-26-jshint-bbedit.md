---
layout: post
title:  "JSHint & BBEdit"
date:   2017-04-26 00:00:00 -0700
categories: jshint javascript bbedit applescript
---

# JSHint & BBEdit

[BBEdit](https://www.barebones.com/products/bbedit/)’s [`bbresults`](https://www.barebones.com/support/bbedit/notes-11.6.html) utility makes it easy to pipe output from shell commands into an easy-to-navigate results/search window.

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) developers who still write their code in BBEdit (as opposed to [Sublime](https://www.sublimetext.com), [Atom](https://atom.io), [Textmate](https://macromates.com), [Visual Studio Code](https://code.visualstudio.com) or whatever the text editor du jour is) will find the following [AppleScript](https://developer.apple.com/library/content/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) invaluable:

<pre><span class="k">try</span>
    <span class="nx">tell</span> <span class="nx">application</span> <span class="s2">&quot;BBEdit&quot;</span>
        <span class="nx">set</span> <span class="nx">mydoc</span> <span class="nx">to</span> <span class="nx">file</span> <span class="k">of</span> <span class="p">(</span><span class="nb">document</span> <span class="mi">1</span> <span class="k">of</span> <span class="nb">window</span> <span class="mi">1</span><span class="p">)</span>
    <span class="nx">end</span> <span class="nx">tell</span>
    <span class="nx">set</span> <span class="nx">posixPath</span> <span class="nx">to</span> <span class="nx">POSIX</span> <span class="nx">path</span> <span class="k">of</span> <span class="nx">mydoc</span>
    <span class="k">if</span> <span class="p">(</span><span class="nx">posixPath</span> <span class="nx">ends</span> <span class="kd">with</span> <span class="s2">&quot;.js&quot;</span> <span class="nx">or</span> <span class="nx">posixPath</span> <span class="nx">ends</span> <span class="kd">with</span> <span class="s2">&quot;.json&quot;</span><span class="p">)</span> <span class="nx">then</span>
        <span class="nx">set</span> <span class="nx">cmd</span> <span class="nx">to</span> <span class="s2">&quot;/usr/local/bin/node /usr/local/bin/jshint &quot;</span> <span class="o">&amp;</span> <span class="p">(</span><span class="nx">quoted</span> <span class="nx">form</span> <span class="k">of</span> <span class="nx">POSIX</span> <span class="nx">path</span> <span class="k">of</span> <span class="nx">mydoc</span><span class="p">)</span> <span class="o">&amp;</span> <span class="s2">&quot; | /usr/local/bin/bbresults -e --pattern &#39;(?P&lt;file&gt;.+?):\\sline\\s(?P&lt;line&gt;\\d+),\\scol\\s((?P&lt;col&gt;\\d+),)?\\s+(?P&lt;msg&gt;.*)$&#39;&quot;</span>
        <span class="k">do</span> <span class="nx">shell</span> <span class="nx">script</span> <span class="nx">cmd</span>
    <span class="nx">end</span> <span class="k">if</span>
<span class="nx">on</span> <span class="nx">error</span>
    <span class="nx">beep</span>
<span class="nx">end</span> <span class="k">try</span></pre>

Save the script in `~/Library/Application Support/BBEdit/Scripts` (and you’ll probably want to assign a keyboard shortcut via the Scripts palette, too).
