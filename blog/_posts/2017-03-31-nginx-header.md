---
layout: post
title:  "`nginx`’s `Server` Response Header"
date:   2017-03-31 00:00:00 -0700
categories: nginx emoji
---

# Modify `nginx`’s `Server` Response Header

Modify your site’s [`nginx`](http://nginx.org/en/)’s configuration file (located at `/etc/nginx/sites-enabled/*.config` on [Ubuntu](http://ubuntu.com)) to have some fun with your `Server` response header:

	# sites-enabled/*.conf
	server {
	  # …
	  more_set_headers 'Server: 💥';
	  # …
	}

