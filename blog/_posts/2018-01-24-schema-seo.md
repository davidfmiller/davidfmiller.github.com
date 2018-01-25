---
layout: post
title: "Make Your Structured Data a Little Easier to Verify"
date:  2018-01-25 00:00:00 -0700
categories: schema seo
---

# Make Your Structured Data a Little Easier to Verify

Recently the time came to update a few projects with metadata per [Schema.org](http://schema.org)’s guidelines. I will leave the arguments for _why_ you should use structured data to [the experts](https://duckduckgo.com/?q=why+use+structured+data&t=osx&ia=web), I will merely share one way to easily  to validate that your structured data is working as intended.

[Google](https://google.com) provides a handy [tool](https://search.google.com/structured-data/testing-tool) that illustrates how the Schema.org metadata embedded in a resource is parsed by their search engine (or _not_, in the situations where incorrect formatting and/or structure is used). The only piece missing is an easy way to point your browser to the tool’s results for any given URL. Behold: 

<a href="javascript:(function()%7Bwindow.location='https://search.google.com/structured-data/testing-tool%23url='+encodeURIComponent(window.location);%7D());" title="Drag this link to your bookmarks bar" class="marklet">→ Structured Data Testing Tool</a>

… a bookmarklet that will accomplish just that. Drag it to your browser’s bookmarks/toolbar to easily view the validation tool’s results for the current page.

(And for the curious, you can view the data extracted from the testing tool <a href="https://search.google.com/structured-data/testing-tool/u/0/#url=https%3A%2F%2Freadmeansrun.com%2Fblog%2Fschema%2Fseo%2F2018%2F01%2F25%2Fschema-seo.html">for this post</a>.)

<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.marklet').addEventListener('click', function(e) {
      e.preventDefault();
      alert(e.target.getAttribute('title'));
    });
  });
</script>
