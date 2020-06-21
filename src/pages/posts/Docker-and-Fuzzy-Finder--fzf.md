---
title: Docker and Fuzzy Finder (fzf)
date: '2017-02-12T15:59:30.930Z'
excerpt: >-
  If you work with docker, and like me, don’t like to use UIs but the terminal
  to express what you want, this article may help you.
thumb_img_path: images/Docker-and-Fuzzy-Finder--fzf/1*yoAiFIPux0R7CDCo-0Eo6Q.png
template: post
---
> If you work with docker, and like me, don’t like to use UIs but the terminal to *express* what you want, this article may help you.

![](/images/Docker-and-Fuzzy-Finder--fzf/1*yoAiFIPux0R7CDCo-0Eo6Q.png)

All we know that *many devs* spend tons of hours using the terminal, although it’s cool, sometimes it can become a pain when the things you want to express are too long, that’s what’s been happening to me with docker, you should know what I mean.

That’s why I want to show you how to create custom commands and comfortable interactive menus in your terminal by using the amazing project [FuzzyFinder](https://github.com/junegunn/fzf) to make your life easier.

*fzf* is a general-purpose command-line fuzzy finder that can be used to create custom interactive menus from the terminal, learn more in the [github repository](https://github.com/junegunn/fzf), first of all install *fzf* in your system:

    git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf  
    ~/.fzf/install

I’ve made the hardest part for you by *learning* bash and coding all the examples in this article, to make it work, you just have to add them to your *.bash\_profile* and reload it in your current session, by the way, Bash 4 is a requirement to make them work.

    vim ~/.bash_profile     # edit  
    source ~/.bash_profile  # reload

* * *

#### Running containers

The first command is **runc**, which is from now an amazing command to run a new container by selecting the docker image from a interactive menu

![](/images/Docker-and-Fuzzy-Finder--fzf/1*lRHYFLuJHotqevMJBt2BVA.gif)

<script src="https://gist.github.com/calbertts/28a722928fa0346e70769602d518e75c.js"></script>

<figcaption>Runs a docker container from an image</figcaption>

#### Running commands in already running containers

Sometimes you just need to run a command in already running container, but it’s pretty annoying to list all the running containers just to get the container’s ID or name, now you can have **runinc**

![](/images/Docker-and-Fuzzy-Finder--fzf/1*YZq7lqZUfJsBdLlxOCnDUw.gif)

<script src="https://gist.github.com/calbertts/8ce6727d782112fd74e5ef32fbc260e4.js"></script>

<figcaption>Runs a command in already running docker container</figcaption>

#### Stopping/Removing containers

Stop or a remove a container choosing it from a fancy menu, removing is optional.

![](/images/Docker-and-Fuzzy-Finder--fzf/1*m7JJK8tqoVoscd9zXJ1C9g.gif)

<script src="https://gist.github.com/calbertts/f7b63feee855bfe1bfe341e5d3868a91.js"></script>

<figcaption>Stops and/or removes a docker container</figcaption>

#### Getting the container’s IP Address

Inspect the IP address quickly choosing the container from the menu by running **showipc**

![](/images/Docker-and-Fuzzy-Finder--fzf/1*AtvTxqyPVTJ7kU2hY63hXA.gif)

<script src="https://gist.github.com/calbertts/de24a012763d3f0ddc229f5a9520d88f.js"></script>

As you can see, these are just few examples about how to operate with fzf and docker, you can adapt them to make them work as you want, hope you find it useful and suggestions or new commands are welcome.

### **:)**
