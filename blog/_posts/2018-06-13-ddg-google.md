---
layout: post
title:  "These are not the Results You're Searching For"
date:   2018-06-13 00:00:00 -0700
categories: javascript
---

# These are not the Results You're Searching For

Quite some time ago I made a conscious effort to begin using alternative services to [Google](https://www.google.com/) after becoming concerned with their questionable approach to privacy and just general level of all-around creepiness. The first (and easiest) step I made was switching my browsers’ default search engines to the privacy-minded [DuckDuckGo](https://duckduckgo.com). And while DuckDuckGo’s search results are _usually_ good enough, there are times when the search results it provides can be underwhelming. It’s only when stumbling across these lacklustre search results that I will begrudgingly call upon the internet overlord to serve my searching needs.

After getting tired of manually copying search terms from one browser tab & pasting to another (after navigating and waiting initial page load), I created a following bookmarklet to jump from DuckDuckGo search results to Google’s results with the click of a button (or a couple taps, if you're on your phone).

Add the following link to your browser favourites:  <a href="javascript:(function()%7B if (document.location.host != 'duckduckgo.com')%7B alert('🚫 🦆 '); return; %7D var input = document.querySelector('input[name=q]'); window.location='https://www.google.com/search?q='+encodeURIComponent(input ? input.value : '');%7D());" onclick="alert('Drag this link to your bookmarks bar'); return false">ddg → google</a>.

… or use the following bookmarklet if you’d prefer to use [Bing](https://www.bing.com) as your fallback search engine: <a href="javascript:(function()%7B if (document.location.host != 'duckduckgo.com')%7B alert('🚫 🦆 '); return; %7D var input = document.querySelector('input[name=q]'); window.location='https://www.bing.com/search?q='+encodeURIComponent(input ? input.value : '');%7D());" onclick="alert('Drag this link to your bookmarks bar'); return false">ddg → bing</a>.