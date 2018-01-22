---
layout: post
title:  "Modify MySQL’s Character Set to Support Emoji"
date:   2017-03-30 00:00:00 -0700
categories: mysql emoji
---

# Modify MySQL’s Character Set to Support Emoji

[MySQL](https://www.mysql.com)’s stock configuration is tuned for space & performance considerations. An unfortunate side-effect of this priority is that trying to insert emoji into your tables will likely fail:

<pre>mysql> INSERT INTO Person(name, bio) VALUES('dave', '🇨🇦☕️🚲🏁🏋🏻☀️🍗🍖🍔🌮🌯🍣📷🖌💻📖🍺🍷😴😴😴');
ERROR 1366 (HY000): Incorrect string value: '\xF0\x9F\x9A\xB2\xF0\x9F...' for column 'bio' at row 1</pre>

A quick scan of MySQL’s configuration reveals the non-`utf8` culprits:

<pre>mysql> SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
+--------------------------+-------------------+
| Variable_name            | Value             |
+--------------------------+-------------------+
| character_set_client     | utf8              |
| character_set_connection | utf8              |
| character_set_database   | latin1            |
| character_set_filesystem | binary            |
| character_set_results    | utf8              |
| character_set_server     | latin1            |
| character_set_system     | utf8              |
| collation_connection     | utf8_general_ci   |
| collation_database       | latin1_swedish_ci |
| collation_server         | latin1_swedish_ci |
+--------------------------+-------------------+</pre>

Because it’s 2017 and not supporting emoji has become a pretty heinous crime, let’s update MySQL’s configuration (the standard distribution for [macOS Sierra](http://www.apple.com/macos/sierra/) is located at `/usr/local/mysql/etc/my.cnf`; [Ubuntu](https://www.ubuntu.com)’s is at `/etc/mysql/mysql.conf.d/mysqld.cnf`) to use 4-byte `utf8` and deal with the storage/performance tradeoffs. Fire up your text editor & edit your MySQL configuration file to include the following key/value pairs:

<pre>[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci</pre>

Restart `mysqld`, reconnect your client and the character set preferences will be reflected:

<pre>mysql> SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
+--------------------------+--------------------+
| Variable_name            | Value              |
+--------------------------+--------------------+
| character_set_client     | utf8mb4            |
| character_set_connection | utf8mb4            |
| character_set_database   | utf8mb4            |
| character_set_filesystem | binary             |
| character_set_results    | utf8mb4            |
| character_set_server     | utf8mb4            |
| character_set_system     | utf8               |
| collation_connection     | utf8mb4_unicode_ci |
| collation_database       | utf8mb4_unicode_ci |
| collation_server         | utf8mb4_unicode_ci |
+--------------------------+--------------------+</pre>

… and the `INSERT` will work as expected:

<pre>mysql> INSERT INTO Person(name, bio) VALUES('dave', '🇨🇦☕️🚲🏁🏋🍗🍖🍔🌮🌯🍣📷🖌💻📖🍺🍷😴😴😴');
Query OK, 1 row affected (0.00 sec)</pre>
