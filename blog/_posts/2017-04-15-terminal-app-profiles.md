---
layout: post
title:  "Terminal.app Profiles"
date:   2017-04-15 00:00:00 -0700
categories: terminal applescript
---

# Terminal.app Profiles

Developers will almost always have a multitude of Terminal windows open at a time: a few random windows/tabs that are opened for one-off tasks/commands that need to run and, more permanently, one window (with several tabs) for each project or set of tasks that are actively being worked on. However, windows of fixed-width text tend to look awfully alike.

macOS’ Terminal.app allows you to easily change the appearance and behaviour of its terminal windows through “Profiles”, which are managed via the Preferences window (`⌘,`). These profiles allow you to assign an instantly-recognizable theme to your windows to quickly and effortlessly navigate back to them once your other tasks are complete.

The only knock against changing profiles for your Terminal window is having your hands leave the keyboard, since Terminal is probably the last place you want to reach for the mouse.

[`terminal-profile`](https://github.com/davidfmiller/apples/blob/master/terminal-profile) is a simple shell script to change the current tab’s profile without your hands leaving the keyboard:

    $ terminal-profile Pro

… where the argument is the name of the profile as defined in Terminal’s preferences (if no argument is provided the default profile is “Pro”).

For even more keyboard convenience, create an alias in `~/.profile`:

    alias tp='terminal-profile'

… and change your Terminal profile with ease:

    $ tp "Red Sands"
