---
layout: post
title:  "Verify your Facebook Metadata"
date:   2018-02-23 00:00:00 -0700
categories: facebook metadata
---

# Verify your Facebook Metadata

In the [previous post](https://readmeansrun.com/blog/schema/seo/2018/01/25/verify-structured-metadata.html) I shared a bookmarklet for easily redirecting your browser to Google's [Structured Data Testing](https://search.google.com/structured-data/testing-tool) tool. [Facebook](https://www.facebook.com) provides a [similar tool](https://developers.facebook.com/tools/debug/sharing) for their [Open Graph](http://opengraphprotocol.org) metadata scraper, and here's a handy bookmarklet to point your browser there:

<a href="javascript:(function()%7Bwindow.location='https://developers.facebook.com/tools/debug/sharing/?q='+encodeURIComponent(window.location);%7D());" title="Drag this link to your bookmarks bar" class="marklet">→ Facebook Sharing Debugger</a>

(View the results from the testing tool <a href="https://developers.facebook.com/tools/debug/sharing/?q=https%3A%2F%2Freadmeansrun.com%2Fblog%2Ffacebook%2Fmetadata%2F2018%2F02%2F22%2Ffacebook-metadata.html">for this post</a>.)

<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.marklet').addEventListener('click', function(e) {
      e.preventDefault();
      alert(e.target.getAttribute('title'));
    });
  });
</script>
