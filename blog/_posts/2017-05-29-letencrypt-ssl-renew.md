---
layout: post
title:  "How to Renew Let’s Encrypt’s SSL Certificates"
date:   2017-05-29 00:00:00 -0700
categories: letsencrypt ssl
---

# How to Renew Let’s Encrypt’s SSL Certificates

A few months ago the [mainframe](https://readmeansrun.com) started serving content via HTTPS, thanks in large part to [Let’s Encrypt](https://letsencrypt.org)’s excellent (and free!) service. The only caveat to Let’s Encrypt’s offering is that their certificates are valid for 90 days, after which they must be renewed. The good news is that you’ll receive a friendly reminder when the expiry date is approaching; the bad news is that the reminder won’t the following command to to renew your certificate:

    sudo letsencrypt certonly --renew-by-default --email {email} -a manual -d {domain} --agree-tos

(Substitute your email address & domain as appropriate, and follow the steps necessary to confirm ownership of the domain being renewed.) 
