---
title: Developing Electron apps in MacOS using Docker
date: '2017-01-27T00:48:38.940Z'
excerpt: I’m here trying to write the article I wanted to find about this topic.
thumb_img_path: >-
  images/Developing-Electron-apps-in-MacOS-using-Docker/1*aKIiCphUpIJuIcnN1y0snw.gif
template: post
---
I’m here trying to write the article I wanted to find about this topic.

I’m not going to explain what Docker or Electron does, I’ll asume that you know what I’m talking about.

If you work in MacOS and want to develop Electron apps without installing a full NodeJS environment, you will find that it can be quite complicated specially because you’re not in a Linux environment where Docker runs natively.

Fortunately, now we have ‘Docker for Mac’ and thanks to XQuartz we can run desktop apps in MacOS by using a Docker container.  
I want to show you how I did it, because it’s fairly likely that you spend some hours trying to find it out.

We’re gonna use `nut`, find out more about this project here:  
[https://github.com/matthieudelaro/nut](https://github.com/matthieudelaro/nut)

First of all, we need to install XQuartz which is an X server to be able to port some apps to MacOS, it’s possible that you need to restart the system in order make it work:

    `brew install xquartz`

Because I know you don’t want to install weird stuff on your host, apart from xquartz, you won’t need to install anything else, the following downloads are very small and they just need to be placed in the root of your project, so you still have the control ;)

To get `nut` run this in the root of your project (it's a simple binary) and give it execution permissions:

    `curl -L` https://goo.gl/sgJJtU `-o nut && chmod a+x nut`

Download the`nut.yml` in the root of your project, learn more about Nut in the [github repository](https://github.com/matthieudelaro/nut):

    curl -L https://goo.gl/igLJ0p -o nut.yml

That’s it, finally you can run the container, and the UI will show up:

    ./nut run

Here’s an example with the Electron basic example:

![](/images/Developing-Electron-apps-in-MacOS-using-Docker/1*aKIiCphUpIJuIcnN1y0snw.gif)

Thanks for reading.
