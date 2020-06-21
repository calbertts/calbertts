---
title: How to create asynchronous APIs for QuickJS
date: '2019-08-17T19:06:46.090Z'
excerpt: Basic introduction to the QuickJS asynchronous approach
thumb_img_path: >-
  images/How-to-create-asynchronous-APIs-for-QuickJS/1*6LZTAiB5m3dQB6zDbko-Dw.png
template: post
---
![](/images/How-to-create-asynchronous-APIs-for-QuickJS/1*6LZTAiB5m3dQB6zDbko-Dw.png)

> Basic introduction to the QuickJS asynchronous approach

Since I’ve been reading the QuickJS engine code, I’ve came up with a simple question as an average javascript developer: ***¿How the asynchronous code work in a low level?***

All we know something about the event loop, in the NodeJS case, the asynchronous I/O is being powered by *libuv*, but it’s not the same for QuickJS.

Since QuickJS was created to be embedded in other systems, tries to reduce the external dependencies to the fullest, so it uses the `select` system call.  
There are several important drawbacks about this approach, but I think, the intention behind is to keep it as much simple as possible.

I’m not going to dive in the `select/poll` internals, instead, I’m going to show how can we develop C modules with the this asynchronous model in mind.

#### C Module for running external processes

Our experiment includes a C module for running external processes from scripts compiled with QuickJS, here’s our C external module, it exposes 2 functions: `open` and `close`

Since this is an external C module, we don’t need to modify the compiler itself, will be statically linked to the final binary.

These will run the corresponding process opening/closing a stream:

<script src="https://gist.github.com/a150c2cad67e97b61732d63f2b2f7ce2.js"></script>

<figcaption>process.c</figcaption>

#### JS script for calling external processes

<script src="https://gist.github.com/9a27ad61160d85472848a5a3d19fae19.js"></script>

<figcaption>myAsyncScript.js</figcaption>

We want to download a JSON file by calling `curl` (we assume it’s installed)

`fd` will stores the file descriptor returned by `open` and then we setup a read handler by using `os` module exposed in QuickJS API.

***This will run asynchronously***, every time there’s data available for the stream, the reader callback will be executed, then we process the raw data sending it to the standard output.

Last line is there to prove the process is not being blocked when running the download, it should be shown at the beginning, this also means we can run several non blocking downloads or pipe several processes.

#### Compiling this example

Regarding to the compilation, first of all, we should compile QuickJS and run `make install` for publishing the corresponding headers and static libraries.

The following Makefile will compile the C module and the JS script, just run `make`:

<script src="https://gist.github.com/d3ec5b56c1bf55bd8ffa9da2cafb0db6.js"></script>

<figcaption>Makefile</figcaption>

The main target `myAsyncScript` will require `process.o` and `myAsyncScript.o` compiled to link them to the final executable.

Notice that before to compile `myAsyncScript.o` we need to generate the corresponding C code, because this is JS code, this is done by calling the QuickJS compiler:

    myAsyncScript.c: myAsyncScript.js  
     qjsc -flto -e -M process,process -m -o $@ myAsyncScript.js

The option `-M` enables the C module to be imported from the script as following:

    import { open, close } from "process"

After the C code is generated, we can compile it with GCC:

    $(OBJDIR)/myAsyncScript.o: myAsyncScript.c  
     $(CC) $(LDFLAGS) $(CFLAGS_OPT) -c $(INCLUDES) -o $@ myAsyncScript.c

#### Conclusions

This was a very basic introduction for running asynchronous code by using QuickJS, in spite of the I/O approach isn’t the most performant one, it may be more suitable for embedded environments.

If you like this topic but need a different approach, there’s an interesting project which combines **QuickJS** and **Libuv:  
**[https://github.com/saghul/quv](https://github.com/saghul/quv)

Here’s a GitHub repository where you can find the code in this example:  
[https://github.com/calbertts/async-quickjs](https://github.com/calbertts/async-quickjs)
