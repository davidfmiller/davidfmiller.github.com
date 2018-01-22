---
layout: post
title:  "Copy BBEdit Document Paths to Clipboard"
date:   2017-11-14 00:00:00 -0700
categories: bbedit applescript
---

# Copy BBEdit Document Paths to Clipboard

Save the following AppleScript in `~/Library/Application Support/BBEdit/Scripts` and run via [BBEdit](http://www.barebones.com/products/bbedit/)'s Scripts panel to copy the paths of all open documents in the active window to your clipboard:

<pre><span class="cm">(*</span>
<span class="cm">    Copy paths of all open text documents in the active BBEdit window to your clipboard</span>
<span class="cm">*)</span>

<span class="k">tell</span> <span class="nb">application</span> <span class="s2">&quot;BBEdit&quot;</span>
    <span class="k">set</span> <span class="nv">mydocs</span> <span class="k">to</span> <span class="nb">every</span> <span class="nb">text</span> <span class="na">document</span> <span class="k">in</span> <span class="na">window</span> <span class="mi">1</span>
    <span class="k">set</span> <span class="nv">urls</span> <span class="k">to</span> <span class="s2">&quot;&quot;</span>
    <span class="k">repeat</span> <span class="nv">with</span> <span class="nv">doc</span> <span class="k">in</span> <span class="nv">mydocs</span>
        <span class="k">set</span> <span class="nv">myurl</span> <span class="k">to</span> <span class="p">(</span><span class="nv">URL</span> <span class="k">of</span> <span class="nv">doc</span><span class="p">)</span>
        <span class="k">if</span> <span class="p">(</span><span class="nv">myurl</span> <span class="ow">is not</span> <span class="no">missing value</span><span class="p">)</span> <span class="k">then</span>
            <span class="k">set</span> <span class="nv">myurl</span> <span class="k">to</span> <span class="p">((</span><span class="nb">characters</span> <span class="mi">8</span> <span class="nb">thru</span> <span class="o">-</span><span class="mi">1</span> <span class="k">of</span> <span class="nv">myurl</span><span class="p">)</span> <span class="k">as </span><span class="nc">string</span><span class="p">)</span>
            <span class="k">set</span> <span class="nv">urls</span> <span class="k">to</span> <span class="nv">urls</span> <span class="o">&amp;</span> <span class="p">{</span><span class="nv">myurl</span><span class="p">}</span> <span class="o">&amp;</span> <span class="s2">&quot;</span>
<span class="s2">&quot;</span>
        <span class="k">end</span> <span class="k">if</span>
    <span class="k">end</span> <span class="k">repeat</span>
<span class="k">end</span> <span class="k">tell</span>

<span class="k">if</span> <span class="p">(</span><span class="nv">urls</span> <span class="ow">is equal</span> <span class="k">to</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="k">then</span>
    <span class="nb">beep</span>
<span class="k">else</span>
    <span class="nb">set the clipboard to</span> <span class="nv">urls</span>
<span class="k">end</span> <span class="k">if</span></pre>
