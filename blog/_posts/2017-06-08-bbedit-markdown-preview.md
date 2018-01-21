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

<pre><span class="p">@</span><span class="k">charset</span> <span class="s2">&quot;UTF-8&quot;</span><span class="p">;</span>

<span class="nt">html</span><span class="p">{</span><span class="k">color</span><span class="p">:</span><span class="mh">#000</span><span class="p">;</span><span class="k">background</span><span class="p">:</span><span class="mh">#FFF</span><span class="p">}</span><span class="nt">body</span><span class="o">,</span><span class="nt">div</span><span class="o">,</span><span class="nt">dl</span><span class="o">,</span><span class="nt">dt</span><span class="o">,</span><span class="nt">dd</span><span class="o">,</span><span class="nt">ul</span><span class="o">,</span><span class="nt">ol</span><span class="o">,</span><span class="nt">li</span><span class="o">,</span><span class="nt">h1</span><span class="o">,</span><span class="nt">h2</span><span class="o">,</span><span class="nt">h3</span><span class="o">,</span><span class="nt">h4</span><span class="o">,</span><span class="nt">h5</span><span class="o">,</span><span class="nt">h6</span><span class="o">,</span><span class="nt">pre</span><span class="o">,</span><span class="nt">code</span><span class="o">,</span><span class="nt">form</span><span class="o">,</span><span class="nt">fieldset</span><span class="o">,</span><span class="nt">legend</span><span class="o">,</span><span class="nt">input</span><span class="o">,</span><span class="nt">textarea</span><span class="o">,</span><span class="nt">p</span><span class="o">,</span><span class="nt">blockquote</span><span class="o">,</span><span class="nt">th</span><span class="o">,</span><span class="nt">td</span><span class="p">{</span><span class="k">margin</span><span class="p">:</span><span class="mi">0</span><span class="p">;</span><span class="k">padding</span><span class="p">:</span><span class="mi">0</span><span class="p">}</span><span class="nt">table</span><span class="p">{</span><span class="k">border-collapse</span><span class="p">:</span><span class="kc">collapse</span><span class="p">;</span><span class="k">border-spacing</span><span class="p">:</span><span class="mi">0</span><span class="p">}</span><span class="nt">fieldset</span><span class="o">,</span><span class="nt">img</span><span class="p">{</span><span class="k">border</span><span class="p">:</span><span class="mi">0</span><span class="p">}</span><span class="nt">address</span><span class="o">,</span><span class="nt">caption</span><span class="o">,</span><span class="nt">cite</span><span class="o">,</span><span class="nt">code</span><span class="o">,</span><span class="nt">dfn</span><span class="o">,</span><span class="nt">em</span><span class="o">,</span><span class="nt">strong</span><span class="o">,</span><span class="nt">th</span><span class="o">,</span><span class="nt">var</span><span class="p">{</span><span class="k">font-style</span><span class="p">:</span><span class="kc">normal</span><span class="p">;</span><span class="k">font-weight</span><span class="p">:</span><span class="kc">normal</span><span class="p">}</span><span class="nt">ol</span><span class="o">,</span><span class="nt">ul</span><span class="p">{</span><span class="k">list-style</span><span class="p">:</span><span class="kc">none</span><span class="p">}</span><span class="nt">caption</span><span class="o">,</span><span class="nt">th</span><span class="p">{</span><span class="k">text-align</span><span class="p">:</span><span class="kc">left</span><span class="p">}</span><span class="nt">h1</span><span class="o">,</span><span class="nt">h2</span><span class="o">,</span><span class="nt">h3</span><span class="o">,</span><span class="nt">h4</span><span class="o">,</span><span class="nt">h5</span><span class="o">,</span><span class="nt">h6</span><span class="p">{</span><span class="k">font-size</span><span class="p">:</span><span class="mi">100</span><span class="kt">%</span><span class="p">;</span><span class="k">font-weight</span><span class="p">:</span><span class="kc">normal</span><span class="p">}</span><span class="nt">q</span><span class="p">:</span><span class="nd">before</span><span class="o">,</span><span class="nt">q</span><span class="p">:</span><span class="nd">after</span><span class="p">{</span><span class="k">content</span><span class="p">:</span><span class="s1">&#39;&#39;</span><span class="p">}</span><span class="nt">abbr</span><span class="o">,</span><span class="nt">acronym</span><span class="p">{</span><span class="k">border</span><span class="p">:</span><span class="mi">0</span><span class="p">;</span><span class="k">font-variant</span><span class="p">:</span><span class="kc">normal</span><span class="p">}</span><span class="nt">sup</span><span class="p">{</span><span class="k">vertical-align</span><span class="p">:</span><span class="kc">text</span><span class="o">-</span><span class="kc">top</span><span class="p">}</span><span class="nt">sub</span><span class="p">{</span><span class="k">vertical-align</span><span class="p">:</span><span class="kc">text</span><span class="o">-</span><span class="kc">bottom</span><span class="p">}</span><span class="nt">input</span><span class="o">,</span><span class="nt">textarea</span><span class="o">,</span><span class="nt">select</span><span class="p">{</span><span class="k">font-family</span><span class="p">:</span><span class="kc">inherit</span><span class="p">;</span><span class="k">font-size</span><span class="p">:</span><span class="kc">inherit</span><span class="p">;</span><span class="k">font-weight</span><span class="p">:</span><span class="kc">inherit</span><span class="p">}</span><span class="nt">input</span><span class="o">,</span><span class="nt">textarea</span><span class="o">,</span><span class="nt">select</span><span class="p">{</span><span class="err">*</span><span class="k">font-size</span><span class="p">:</span><span class="mi">100</span><span class="kt">%</span><span class="p">}</span><span class="nt">legend</span><span class="p">{</span><span class="k">color</span><span class="p">:</span><span class="mh">#000</span><span class="p">}#</span><span class="nn">yui3-css-stamp</span><span class="p">.</span><span class="nc">cssreset</span><span class="p">{</span><span class="k">display</span><span class="p">:</span><span class="kc">none</span><span class="p">}</span>

<span class="nt">html</span> <span class="p">{</span>
  <span class="k">background</span><span class="p">:</span> <span class="mh">#fff</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">body</span> <span class="p">{</span>
  <span class="k">background</span><span class="p">:</span> <span class="mh">#fff</span><span class="p">;</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#000</span><span class="p">;</span>
  <span class="k">font</span><span class="p">:</span> <span class="mi">12</span><span class="kt">px</span> <span class="n">menlo</span><span class="p">,</span> <span class="n">consolas</span><span class="p">,</span> <span class="n">monaco</span><span class="p">,</span> <span class="kc">monospace</span><span class="p">;</span>
  <span class="k">max-width</span><span class="p">:</span> <span class="mi">800</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">0</span> <span class="mi">50</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">padding</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">h1</span> <span class="p">{</span>
  <span class="k">font-size</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">position</span><span class="p">:</span> <span class="kc">relative</span><span class="p">;</span>
  <span class="k">font-weight</span><span class="p">:</span> <span class="kc">bold</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">h2</span> <span class="p">{</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
  <span class="k">position</span><span class="p">:</span> <span class="kc">relative</span><span class="p">;</span>
  <span class="k">font-weight</span><span class="p">:</span> <span class="kc">bold</span><span class="p">;</span>
  <span class="k">font-size</span><span class="p">:</span><span class="mi">15</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">h3</span> <span class="p">{</span>
  <span class="k">font-weight</span><span class="p">:</span> <span class="kc">bold</span><span class="p">;</span>
  <span class="k">position</span><span class="p">:</span> <span class="kc">relative</span><span class="p">;</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">h1</span><span class="o">,</span> <span class="nt">h2</span><span class="o">,</span> <span class="nt">h3</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#444</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">a</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="kc">blue</span><span class="p">;</span>
  <span class="k">text-decoration</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="k">border-bottom-width</span><span class="p">:</span> <span class="mi">1</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">border-bottom-style</span><span class="p">:</span> <span class="kc">solid</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">a</span><span class="p">:</span><span class="nd">visited</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="kc">purple</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">a</span><span class="p">:</span><span class="nd">hover</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="kc">red</span><span class="p">;</span>
<span class="p">}</span>


<span class="nt">h1</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">h1</span> <span class="nt">a</span><span class="p">:</span><span class="nd">visited</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#000</span><span class="p">;</span>
  <span class="k">border-bottom-width</span><span class="p">:</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">h1</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span> <span class="p">{</span>
  <span class="k">border-bottom-width</span><span class="p">:</span> <span class="mi">1</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>


<span class="nt">dt</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">dt</span> <span class="nt">a</span><span class="p">:</span><span class="nd">visited</span><span class="o">,</span>
<span class="nt">h3</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">h3</span> <span class="nt">a</span><span class="p">:</span><span class="nd">visited</span><span class="o">,</span>
<span class="nt">h2</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">h2</span> <span class="nt">a</span><span class="p">:</span><span class="nd">visited</span> <span class="p">{</span>
  <span class="k">position</span><span class="p">:</span> <span class="kc">absolute</span><span class="p">;</span>
  <span class="k">text-decoration</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="k">border</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#eee</span><span class="p">;</span>
  <span class="k">left</span><span class="p">:</span> <span class="mi">-15</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">transition</span><span class="p">:</span> <span class="kc">color</span> <span class="mf">0.2</span><span class="kt">s</span> <span class="kc">linear</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dt</span><span class="p">:</span><span class="nd">hover</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">h3</span><span class="p">:</span><span class="nd">hover</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">h2</span><span class="p">:</span><span class="nd">hover</span> <span class="nt">a</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#888</span><span class="p">;</span>
<span class="p">}</span>


<span class="nt">dt</span><span class="p">:</span><span class="nd">target</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">h2</span><span class="p">:</span><span class="nd">target</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">h3</span><span class="p">:</span><span class="nd">target</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">dt</span><span class="p">:</span><span class="nd">target</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span><span class="o">,</span>
<span class="nt">h2</span><span class="p">:</span><span class="nd">target</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span><span class="o">,</span>
<span class="nt">h3</span><span class="p">:</span><span class="nd">target</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="kc">red</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">h3</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span><span class="o">,</span>
<span class="nt">dt</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span><span class="o">,</span>
<span class="nt">h2</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span> <span class="p">{</span>
  <span class="k">text-decoration</span><span class="p">:</span> <span class="kc">underline</span><span class="p">;</span>
  <span class="k">color</span><span class="p">:</span> <span class="kc">blue</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">p</span> <span class="p">{</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
  <span class="k">line-height</span><span class="p">:</span> <span class="mi">2</span><span class="kt">em</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">p</span> <span class="o">+</span> <span class="nt">p</span> <span class="p">{</span>
  <span class="k">margin-top</span><span class="p">:</span> <span class="mi">-10</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>


<span class="nt">dt</span> <span class="p">{</span>
  <span class="k">position</span><span class="p">:</span> <span class="kc">relative</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dl</span> <span class="p">{</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dd</span> <span class="p">{</span>
  <span class="k">padding-left</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dd</span> <span class="nt">ul</span><span class="o">,</span> <span class="nt">dd</span> <span class="nt">ol</span> <span class="p">{</span>
  <span class="k">margin-top</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dd</span><span class="p">:</span><span class="nd">before</span> <span class="p">{</span>
  <span class="k">content</span><span class="p">:</span> <span class="s2">&quot;-&quot;</span><span class="p">;</span>
  <span class="k">padding-right</span><span class="p">:</span><span class="mi">10</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dt</span> <span class="o">+</span> <span class="nt">dd</span> <span class="o">&gt;</span> <span class="nt">pre</span> <span class="p">{</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dd</span> <span class="o">+</span> <span class="nt">dd</span> <span class="o">&gt;</span> <span class="nt">pre</span> <span class="p">{</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">-10</span><span class="kt">px</span> <span class="mi">0</span> <span class="mi">10</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">li</span> <span class="p">{</span>
  <span class="k">padding-left</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">margin-bottom</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">li</span><span class="p">:</span><span class="nd">last-child</span> <span class="p">{</span>
  <span class="k">margin-bottom</span><span class="p">:</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">ol</span> <span class="nt">li</span> <span class="p">{</span>
  <span class="k">list-style-position</span><span class="p">:</span> <span class="kc">inside</span><span class="p">;</span>
  <span class="k">list-style-type</span><span class="p">:</span> <span class="kc">decimal</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">ul</span> <span class="nt">li</span><span class="p">:</span><span class="nd">after</span> <span class="p">{</span>
  <span class="k">content</span><span class="p">:</span> <span class="s2">&quot;,&quot;</span><span class="p">;</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#666</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">li</span><span class="p">:</span><span class="nd">last-child</span> <span class="p">{</span>

<span class="p">}</span>

<span class="nt">ul</span> <span class="nt">li</span><span class="p">:</span><span class="nd">last-child</span><span class="p">:</span><span class="nd">after</span> <span class="p">{</span>
  <span class="k">content</span><span class="p">:</span> <span class="s2">&quot;.&quot;</span>
<span class="p">}</span>

<span class="nt">ul</span> <span class="nt">li</span><span class="p">:</span><span class="nd">before</span> <span class="p">{</span>
  <span class="k">content</span><span class="p">:</span> <span class="s2">&quot;×&quot;</span><span class="p">;</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#666</span><span class="p">;</span>
  <span class="k">padding-right</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">em</span> <span class="p">{</span>
  <span class="k">font-style</span><span class="p">:</span> <span class="kc">italic</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">code</span><span class="o">,</span> <span class="nt">pre</span> <span class="p">{</span>
  <span class="k">font-family</span><span class="p">:</span> <span class="n">consolas</span><span class="p">,</span> <span class="n">menlo</span><span class="p">,</span> <span class="n">monaco</span><span class="p">,</span> <span class="kc">monospace</span><span class="o">-</span><span class="kc">serif</span><span class="p">;</span>
  <span class="k">background</span><span class="p">:</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mf">0.03</span><span class="p">);</span>
<span class="p">}</span>

<span class="nt">pre</span> <span class="nt">code</span> <span class="p">{</span>
  <span class="k">line-height</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">code</span> <span class="nt">a</span><span class="o">,</span>
<span class="nt">code</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="mh">#666</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">code</span><span class="p">:</span><span class="nd">hover</span> <span class="p">{</span>
  <span class="k">background</span><span class="p">:</span> <span class="mh">#f0f0f0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">pre</span> <span class="p">{</span>
  <span class="k">background</span><span class="p">:</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mf">0.02</span><span class="p">);</span>
  <span class="k">padding</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">border-radius</span><span class="p">:</span> <span class="mi">3</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
  <span class="k">border</span><span class="p">:</span> <span class="mi">1</span><span class="kt">px</span> <span class="kc">solid</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mf">0.1</span><span class="p">);</span>
  <span class="k">transition</span><span class="p">:</span> <span class="k">background-color</span> <span class="mf">0.2</span><span class="kt">s</span><span class="p">,</span> <span class="k">border-color</span> <span class="mf">0.2</span><span class="kt">s</span><span class="p">;</span>
  <span class="k">cursor</span><span class="p">:</span> <span class="kc">text</span><span class="p">;</span>
  <span class="k">position</span><span class="p">:</span> <span class="kc">relative</span><span class="p">;</span>
  <span class="k">overflow</span><span class="p">:</span> <span class="kc">scroll</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">pre</span><span class="p">.</span><span class="nc">lines</span> <span class="p">{</span>
  <span class="k">padding</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">pre</span> <span class="nt">code</span> <span class="p">{</span>
  <span class="k">background</span><span class="p">:</span> <span class="kc">transparent</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">pre</span><span class="p">:</span><span class="nd">hover</span> <span class="p">{</span>
  <span class="k">background</span><span class="p">:</span><span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mf">0.05</span><span class="p">);</span>
  <span class="k">border-color</span><span class="p">:</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mf">0.3</span><span class="p">);</span>
<span class="p">}</span>

<span class="nt">pre</span> <span class="nt">a</span> <span class="p">{</span>
  <span class="k">color</span><span class="p">:</span> <span class="kc">blue</span><span class="p">;</span>
  <span class="k">border-bottom-width</span><span class="p">:</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">pre</span> <span class="nt">a</span><span class="p">:</span><span class="nd">hover</span> <span class="p">{</span>
  <span class="k">border-bottom-width</span><span class="p">:</span> <span class="mi">1</span><span class="kt">px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">i</span> <span class="p">{</span>
  <span class="kp">-webkit-</span><span class="n">touch-callout</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="kp">-webkit-</span><span class="k">user-select</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="kp">-khtml-</span><span class="k">user-select</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="kp">-moz-</span><span class="k">user-select</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="kp">-ms-</span><span class="k">user-select</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="k">user-select</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">dl</span> <span class="p">{</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">hr</span> <span class="p">{</span>
  <span class="k">height</span><span class="p">:</span> <span class="mi">1</span><span class="kt">px</span><span class="p">;</span>
  <span class="k">border</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span>
  <span class="k">line-height</span><span class="p">:</span> <span class="mi">0</span><span class="p">;</span>
  <span class="k">padding</span><span class="p">:</span> <span class="mi">0</span><span class="p">;</span>
<span class="c">/*  background: rgba(0,0,0,0.1);*/</span>
  <span class="k">background</span><span class="p">:</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">127</span><span class="p">,</span><span class="mi">127</span><span class="p">,</span><span class="mi">127</span><span class="p">,</span><span class="mf">0.1</span><span class="p">);</span>
  <span class="k">margin</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">pre</span> <span class="nt">table</span> <span class="p">{</span>
  <span class="k">width</span><span class="p">:</span> <span class="mi">100</span><span class="kt">%</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">pre</span> <span class="nt">tr</span> <span class="nt">td</span> <span class="p">{</span>
  <span class="k">transition</span><span class="p">:</span> <span class="k">background-color</span> <span class="mf">0.1</span><span class="kt">s</span><span class="p">;</span>
  <span class="k">padding</span><span class="p">:</span> <span class="mf">0.1</span><span class="kt">em</span> <span class="mi">0</span><span class="p">;</span>
<span class="p">}</span>


<span class="p">@</span><span class="k">media</span> <span class="nt">screen</span> <span class="nt">and</span> <span class="o">(</span><span class="nt">max-device-width</span><span class="o">:</span> <span class="nt">480px</span><span class="o">)</span> <span class="p">{</span> <span class="c">/* smartphone */</span>

  <span class="nt">body</span> <span class="p">{</span> <span class="k">width</span><span class="p">:</span> <span class="mi">90</span><span class="kt">%</span><span class="p">;</span> <span class="k">margin</span><span class="p">:</span> <span class="mi">0</span> <span class="kc">auto</span><span class="p">;</span> <span class="k">padding</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span> <span class="p">}</span>
<span class="p">}</span>


<span class="p">@</span><span class="k">media</span> <span class="nt">only</span> <span class="nt">screen</span> <span class="nt">and</span> <span class="o">(</span><span class="nt">device-width</span><span class="o">:</span> <span class="nt">768px</span><span class="o">)</span> <span class="p">{</span> <span class="c">/* tablet */</span>

  <span class="nt">body</span> <span class="p">{</span> <span class="k">width</span><span class="p">:</span> <span class="mi">90</span><span class="kt">%</span><span class="p">;</span> <span class="k">margin</span><span class="p">:</span> <span class="mi">0</span> <span class="kc">auto</span><span class="p">;</span> <span class="k">padding</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span> <span class="mi">0</span><span class="p">;</span>  <span class="p">}</span>
<span class="p">}</span></pre>
