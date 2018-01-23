---
layout: post
title:  "Cache-Control is your Friend"
date:   2018-01-22 00:00:00 -0700
categories: http node express cache
---

# Cache-Control is your Friend


One of my favorite pet/personal projects is [Backdrop](https://github.com/davidfmiller/backdrop/), a simple JavaScript utility for preloading images and gracefully fading them into a webpage — as opposed to relying on the default browser behaviour of suddenly loading them into the page.

After including Backdrop within the front-end of an application served via [Express](https://expressjs.com) on [Node.js](https://nodejs.org/), there was a brief (but undesirable) flicker when loading images through Backdrop, but _only_ in [Safari](https://www.apple.com/safari/); [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [Chrome](https://www.google.com/chrome/) behaved as desired. After digging & poking around in web inspectors and [`curl`](https://en.wikipedia.org/wiki/curl), I found out that Express’ (outdated) static middleware was _not_ instructing browsers to cache the response for the image in question: 

<pre>$ curl http://localhost:8081/assets/img/backdrop.jpg --head
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Fri, 19 Jan 2018 05:35:13 GMT
ETag: W/"c2fb7-1610ce9ef40"
Content-Type: image/jpeg
Content-Length: 798647
Date: Mon, 22 Jan 2018 05:59:58 GMT
Connection: keep-alive</pre>

Backdrop employs some [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) trickery behind the scenes and long story short, Safari was making a second request for the image despite it being successfully fetched from the page, and it was this _second_ request that was the root cause of the flicker. After updating the application with [serve-static](https://www.npmjs.com/package/serve-static) and providing a `max-age`…

<pre><span class="kr">const</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">(),</span>
      <span class="nx">serveStatic</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;serve-static&#39;</span><span class="p">);</span>
<span class="c1">//…</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="nx">serveStatic</span><span class="p">(</span><span class="nx">path</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="nx">__dirname</span><span class="p">,</span> <span class="s1">&#39;static&#39;</span><span class="p">),</span> <span class="p">{</span>
  <span class="nx">maxAge</span><span class="o">:</span> <span class="s1">&#39;1d&#39;</span>
<span class="p">});</span>
</pre>

… the flicker’s eliminated. You can see the fruits of my labour [here](https://dfm.photography).
