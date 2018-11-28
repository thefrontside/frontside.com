---
templateKey: blog-post
title: "mod_rewrite: Remeber that the version counts"
author: Charles Lowell
date: 2007-06-11T12:00:00.000Z
tags: 
    - tips
directory_index: false
---

Pro Tip: Which regular expressions work depends on the version of Apache/mod_rewrite that you're using. I recently tested the following rewrite rule on Apache2

    RewriteRule ^archives/(\d+).html http://www.thefrontside.net/map2new.php?$1 [R]


I wanted to match files like archives/000532.html.

But when it came time to deploy, it didn't work. Turns out the environment I was deploying to was using a different version of Apache. That's bad practice of course, but aside from that, the little gotcha was that the regular expression interpreter was different in different versions of Apache, and in this case, its behavior differed not only from the newer version but also from the behavior of most regexp engine's out there. Specifically, the "digit" literal `\d` is not understood by older versions (which interpret it as a literal "d").

Instead I had to use \[0-9\]


    RewriteRule ^archives/([0-9]+).html http://www.thefrontside.net/map2new.php?$1 [R]


This is a very specific nugget, but hopefully it will save someone a headache down the road. Just remember, if your mod_rewrite regexp isn't working, <em>check the specific version of the engine</em>, and make sure your regexp is one that it will understand.
