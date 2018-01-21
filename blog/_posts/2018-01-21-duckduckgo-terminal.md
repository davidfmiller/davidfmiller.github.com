---
layout: post
title:  "DuckDuckGo From Your Terminal"
date:   2018-01-21 00:00:00 -0700
categories: duckduckgo terminal
---

# DuckDuckGo From Your Terminal

It's been quite some time since I became frustrated with Google's shady business practices and insatiable appetite for consumers' personal information. After stumbling upon [DuckDuckGo](https://duckduckgo.com) I made the switch and haven't looked back.

Since I conduct dozens of searches per day, _anything_ that will make getting to the relevant search results faster is invaluable. Modern web browsers let you access search results after entering your query in the address field. However this approach requires you to have already activated your browser of choice and created a new window/tab to avoid clobbering your existing context.

[LaunchBar](https://www.obdev.at/launchbar) ships with a DuckDuckGo search template, making it easy to jump straight to your desired search results with just a few keystrokes _whatever_ you happen to be doing your Mac.

But, as a developer who spends excessive amounts of time in terminal windows, I figured it was possible to make it _even easier_ to get to search results in my preferred web browser from the command line… and thus [ddg](https://github.com/davidfmiller/bin/blob/master/ddg) was born. Behold, the world's simplest (yet indispensable) shell script:

<pre><span class="ch">#!/bin/sh</span>

open <span class="s2">&quot;https://duckduckgo.com?q=</span><span class="nv">$@</span><span class="s2">&quot;</span></pre>

Because `ddg` simply forwards the script's arguments on as your search query, Duck Duck Go's excellent
[Bangs](https://duckduckgo.com/bang) feature is free, ex:

<pre><span class="c1"># Feelin&#39; lucky</span>
ddg <span class="s1">&#39;! launchbar&#39;</span>

<span class="c1"># Mozilla Developer Center</span>
ddg <span class="s1">&#39;!mdc css-grid&#39;</span>

<span class="c1"># Apple Developer Center</span>
ddg <span class="s1">&#39;!adc WebURLsWithTitlesPboardType&#39;</span>

<span class="c1"># YouTube</span>
ddg <span class="s1">&#39;!yt ronan rack&#39;</span></pre>

(Note the single quotes wrapping the search terms above; using double quotes will require you to escape the `!` to prevent its shell interpolation.)

Should no arguments be provided, you can always initiate your search from your browser once it is activated by the script.
