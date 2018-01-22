---
layout: post
title:  "Modify nginx’s Server Response Header"
date:   2017-03-31 00:00:00 -0700
categories: nginx emoji
---

# Modify `nginx`’s Server Response Header

Modify your site’s [`nginx`](http://nginx.org/en/)’s configuration file (the default is located at `/etc/nginx/sites-enabled/default` on [Ubuntu](http://ubuntu.com)) to cloak your infrastructure & have some fun with your `Server` response header:

<pre>server {
    # …
    more_set_headers 'Server: 💥';
    # …
}</pre>

(The irony in revealing some of the mainframe's infrastructure should be duly noted.)
