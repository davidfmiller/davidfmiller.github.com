---
layout: post
title:  "Ubuntu Boostrap"
date:   2017-03-22 00:00:00 -0700
categories: linux
---

# Ubuntu Boostrap

The [mainframe](https://readmeansrun.com) & a few other projects are now on [Ubuntu](https://www.ubuntu.com) machines at [Linode](https://www.linode.com), a provider of cloud-hosting and a sponsor-of-podcasts-extraordinaire.

Linode provides comprehensive [documentation](https://www.linode.com/docs/) for getting up & running on their (virtual) hardware, but since I’ll be going through this rigamarole a few times in the near future I figured it was best to have a relatively methodical approach… BEHOLD!

(The script probably contains a few things that you won't need — [PHP](https://secure.php.net) _and_ [Node](https://nodejs.org/) — so please don’t copy & paste blindly.)

<pre class="rmr-modal"><span class="pl-c"><span class="pl-c">#</span> https://www.linode.com/docs/security/use-public-key-authentication-with-ssh</span>


mkdir -p <span class="pl-k">~</span>/.ssh <span class="pl-k"></span> sudo chmod -R 700 <span class="pl-k">~</span>/.ssh/
<span class="pl-c"><span class="pl-c">#</span> add node user</span>
sudo adduser node
sudo adduser node sudo


<span class="pl-c"><span class="pl-c">#</span> packages</span>
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install ruby
sudo apt-get install golang-go
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install git
sudo apt-get install clang libicu-dev
sudo apt-get install libpython2.7
sudo apt-get install software-properties-common python-software-properties
sudo apt-get install openssl
sudo apt-get install memcached
sudo apt-get install letsencrypt
sudo apt-get install ufw
sudo apt-get install ack-grep
sudo apt-get install certbot
sudo apt install mailutils
apt-get install opendkim opendkim-tools postfix-policyd-spf-python
sudo apt-get install opendkim opendkim-tools


<span class="pl-c"><span class="pl-c">#</span> profile</span>
mkdir <span class="pl-k">~</span>/Documents/
mkdir <span class="pl-k">~</span>/Documents/git
<span class="pl-c1">cd</span> <span class="pl-k">~</span>/Documents/git
git clone https://github.com/davidfmiller/lsemoji.git
git clone https://github.com/davidfmiller/bin.git
git clone https://github.com/davidfmiller/configs.git


<span class="pl-c"><span class="pl-c">#</span> python </span>
sudo apt-get install python-pip python-dev build-essential
sudo pip install --upgrade pip
sudo pip install Pygments
sudo pip install aws-shell
sudo pip install Pillow
sudo pip install sphinx sphinx-autobuild
sudo pip install recommonmark
sudo pip install pygments-markdown-lexer


<span class="pl-c"><span class="pl-c">#</span> node</span>
<span class="pl-c1">cd</span> <span class="pl-k">~</span>
wget http://nodejs.org/dist/latest-v7.x/node-v7.7.2-linux-x64.tar.gz
mkdir node
tar xvf node-v<span class="pl-k">*</span>.tar.<span class="pl-k">?</span>z --strip-components=1 -C ./node
<span class="pl-c1">cd</span> <span class="pl-k">~</span>
rm -rf node-v<span class="pl-k">*</span>
mkdir node/etc
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds"></span>prefix=/usr/local<span class="pl-pds"></span></span> <span class="pl-k"></span> node/etc/npmrc
sudo mv node /opt/
sudo chown -R root: /opt/node
sudo ln -s /opt/node/bin/node /usr/local/bin/node
sudo ln -s /opt/node/bin/npm /usr/local/bin/npm


npm install -g istanbul
sudo npm i grunt --global
sudo npm install -g pm2
sudo npm install -g snyk
sudo apt-get install nginx
sudo apt-get install nginx-extras
sudo service nginx restart


<span class="pl-c"><span class="pl-c">#</span> yarn</span>
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg <span class="pl-k">|</span> sudo apt-key add -
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds"></span>deb https://dl.yarnpkg.com/debian/ stable main<span class="pl-pds"></span></span> <span class="pl-k">|</span> sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update <span class="pl-k"></span> sudo apt-get install yarn


<span class="pl-c"><span class="pl-c">#</span> mysql  php</span>
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo apt-get install php


<span class="pl-c"><span class="pl-c">#</span> ruby</span>
sudo gem update --system
sudo apt-get install -y git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties
sudo apt-get install -y libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
curl -L https://get.rvm.io <span class="pl-k">|</span> bash -s stable
<span class="pl-c1">source</span> <span class="pl-k">~</span>/.rvm/scripts/rvm
<span class="pl-c1">echo</span> <span class="pl-s"><span class="pl-pds"></span>source ~/.rvm/scripts/rvm<span class="pl-pds"></span></span> <span class="pl-k"></span> <span class="pl-k">~</span>/.bashrc
rvm install 2.3.1
rvm use 2.3.1 --default
ruby -v


<span class="pl-c"><span class="pl-c">#</span> gems</span>
sudo gem install sass
sudo gem install jekyll
sudo apt install ruby-compass


<span class="pl-c"><span class="pl-c">#</span> firewall</span>
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow ssh <span class="pl-c"><span class="pl-c">#</span> remove this line if ssh keys have been setup</span>
sudo ufw <span class="pl-c1">enable</span>


<span class="pl-c"><span class="pl-c">#</span> https://www.linode.com/docs/databases/mysql/install-mysql-on-ubuntu-14-04</span>
<span class="pl-c"><span class="pl-c">#</span> https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-12-04</span>
</pre>


{% comment %}
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/

{% endcomment %}
