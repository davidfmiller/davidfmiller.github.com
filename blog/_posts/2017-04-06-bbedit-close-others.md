---
layout: post
title:  "Close All Other Documents in BBEdit's Window"
date:   2017-04-06 00:00:00 -0700
categories: bbedit applescript
---

# Close All Other Documents in BBEdit's Window

A simple [AppleScript](https://developer.apple.com/library/content/documentation/AppleScript/Conceptual/AppleScriptX/AppleScriptX.html) to close all other documents (ie: everything *except* for the document you’re currently editing) in the front-most [BBEdit](http://www.barebones.com/products/bbedit/index.html) window:

<pre><span class="k">try</span>
    <span class="k">tell</span> <span class="nb">application</span> <span class="s2">&quot;BBEdit&quot;</span>
        <span class="k">set</span> <span class="nv">mywindow</span> <span class="k">to</span> <span class="na">window</span> <span class="mi">1</span>
        <span class="k">set</span> <span class="nv">mydoc</span> <span class="k">to</span> <span class="p">(</span><span class="nv">URL</span> <span class="k">of</span> <span class="na">document</span> <span class="mi">1</span> <span class="k">of</span> <span class="nv">mywindow</span><span class="p">)</span> <span class="k">as</span> <span class="nv">POSIX</span> <span class="nv">file</span>

        <span class="k">set</span> <span class="nv">alldocs</span> <span class="k">to</span> <span class="nb">documents</span> <span class="k">of</span> <span class="nv">mywindow</span>
        <span class="k">repeat</span> <span class="nv">with</span> <span class="nv">doc</span> <span class="k">in</span> <span class="nv">alldocs</span>
            <span class="k">if</span> <span class="p">((((</span><span class="nv">URL</span> <span class="k">of</span> <span class="nv">doc</span><span class="p">)</span> <span class="k">as</span> <span class="nv">POSIX</span> <span class="nv">file</span><span class="p">)</span> <span class="k">as </span><span class="nc">string</span><span class="p">)</span> <span class="ow">is equal</span> <span class="k">to</span> <span class="p">(</span><span class="nv">mydoc</span> <span class="k">as </span><span class="nc">string</span><span class="p">))</span> <span class="k">then</span>
                <span class="c">-- active doc</span>
            <span class="k">else</span>
                <span class="nb">close</span> <span class="nv">doc</span>
            <span class="k">end</span> <span class="k">if</span>
        <span class="k">end</span> <span class="k">repeat</span>
    <span class="k">end</span> <span class="k">tell</span>
<span class="k">on</span> <span class="k">error</span>
    <span class="nb">beep</span>
<span class="k">end</span> <span class="k">try</span></pre>

Copy, paste, & save it as a file in `~/Library/Application Support/BBEdit/Scripts`, where you’ll be able to invoke it via BBEdit’s Scripts palette (`Window → Palettes → Scripts`) or via the `Scripts` menu (whose visibility can be toggled on or off in the Preferences window’s `Menus & Shortcuts` pane).
