---
title: Writing native modules in C for QuickJS engine
date: '2019-07-20T17:14:36.312Z'
excerpt: Basic introduction to native C modules for QuickJS
thumb_img_path: >-
  images/Writing-native-modules-in-C-for-QuickJS-engine/1*296ZOXyWMKZyZR57elbyag.png
template: post
---
![](/images/Writing-native-modules-in-C-for-QuickJS-engine/1*296ZOXyWMKZyZR57elbyag.png)

> Basic introduction to native C modules for QuickJS

Few days ago a new Javascript engine was released by **Fabrice Bellard**, the QEMU and FFmpeg creator.

This caught my eye, because I’m a Javascript developer and I’ve been always interested in NodeJS internals, so I saw a good opportunity to learn more about how the JS code is actually executed in a low level.

I know this engine was created with embedded systems in mind, is really tiny and lightweight, and taking advantage of fact that the code base is still small, I’m trying to understand how it works and mainly, how to extend it.

And that’s what I’m trying to explain here, not form an expert point of view, but a rookie and someone with basic knowledge about C++.

### QuickJS is not a kind of NodeJS, it’s more like V8

I’ve seen a lot of confusion about if QuickJS is just a NodeJS replacement, it is not, actually, you can’t port code directly from NodeJS to QuickJS because NodeJS has it’s own APIs (fs, path, process, net, etc) and QuickJS has a very small set of native functions to play with.

So, to improve our understanding about it, we’re going create a very basic C module to run its functions from Javascript.

* * *

### Getting started

#### Goal

What we want at the end of this article is to make this code work in an independent executable after compiling with QuickJS compiler:

<script src="https://gist.github.com/2f3f595fcca16fc8e709907a574870ed.js"></script>

<figcaption>my_module.js</figcaption>

#### Prepare the source

You can read the compiling instructions from [https://bellard.org/quickjs/quickjs.html#Installation](https://bellard.org/quickjs/quickjs.html#Installation)  
After compiling all the source code with `make`, try to compile and run the code I described above with:

    # compile  
    ./qjsc -m -o my_module my_module.js
    # run  
    ./my_module

You will see this error:

    ReferenceError: could not load module filename 'my_module'

#### Add the module name to the compiler

Edit the compiler source code `qjsc.c` in the line 455 where the system modules are added to be recognized later:

    ...  
    /* add system modules */  
    namelist_add(&cmodule_list, "std", "std", 0);  
    namelist_add(&cmodule_list, "os", "os", 0);
    // our module  
    namelist_add(&cmodule_list, "my_module", "my_module", 0);  
    ...

Build the compiler again and test:

    # This will build the compiler only, it's faster  
    make qjsc
    # Test again  
    ./qjsc -m -o my_module my_module.js

Then, an error like this will be shown:

    /tmp/ccenbi7V.o: In function `main’:  
    out19678.c:(.text.startup+0x84): undefined reference to `js_init_module_my_module’  
    collect2: error: ld returned 1 exit status

The compiler cannot be built because we’re telling it we have another system module called `my_module`, but the implementation is not found, since we want a static linking the compiler looks for a function called `js_init_module_my_module`, this name is created dynamically in compilation time, so, out binary is not created.

#### Native module template

Add the following C code, created based on the examples found in the QuickJS source code:

<script src="https://gist.github.com/54b094bdffcf711d1d97d4cf61cfafb2.js"></script>

<figcaption>my_module.c</figcaption>

As you can see `*js_init_module_my_module` is the entry point to the module, also there’s an initialization function `js_my_module_init`, a function’s list `js_my_module_funcs` and the function itself `plusNumbers`, the only mandatory function’s name is the entry point, because is dynamically generated based on the module name described in `qjsc.c` , it has to have this format: `*js_init_module_[MODULE_NAME]`

To add more functions to our module, just extend `JS_CFUNC_DEF` , it waits 3 parameters, the function’s name, the number of parameters and the function definition.

The function `plusNumbers` has to return a `JS_Value` which is an abstraction of any Javascript supported type, this structure is declared in `quickjs.h` , there you’ll find all the others structures available, in this case we’re returning `JS_NewInt32` structure for representing numbers.

For reading the parameters we’re using the following lines:

    int a;  
    JS_ToInt32(ctx, &a, argv[0])

Here we’re converting a JS Number to C number by passing the variable as a reference and reading the coming parameter from `argv` array.

#### Adding the C code to Makefile

Since we’re trying to extend the QuickJS compiler, we must add it as a dependency in the Makefile:

Add a new object a the end of `QJS_LIB_OBJS` :

    QJS_LIB_OBJS= ... $(OBJDIR)/my_module.o

So next time we build the compiler, it will make sure that target `./my_module.o` is present, if not, it will be compiled, there’s already a target for compiling all C code in the source directory.

So, the final tests will be:

    # build the compiler  
    make qjsc
    # compile our example code  
    ./qjsc -m -o my_module my_module.js
    # run the program  
    ./my_module
    output => Result 5

After this, we have an independent executable with **3090416 bytes** (3~ MB) of size, it’s not huge, but it can be optimized to be smaller and faster with `flto` flag:

    ./qjsc -flto -m -o my_module my_module.js

Now we have a binary with **652~KB** with a program coded by using **ES2019**!

Happy coding! :)
