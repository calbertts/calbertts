---
title: 'Take a look on the mainmethod of the compiler in theqjsc.c file:'
date: '2019-08-18T08:07:01.550Z'
excerpt: >-
  If you pass the -M option to the compiler, the module is registered, that’s
  why in the Makefile , in order to generate the C code, I do:
template: post
---
Take a look on the `main`method of the compiler in the`qjsc.c` file:

    case 'M':  
     {  
        ...  
        namelist_add(&cmodule_list, path, cname, 0);  
     }  
     break;

If you pass the `-M` option to the compiler, the module is registered, that’s why in the `Makefile` , in order to generate the C code, I do:

    myAsyncScript.c: myAsyncScript.js  
     qjsc -flto -e -M process,process -m -o $@ myAsyncScript.js

In this way, we’re telling to the script that there will be a module called `process` which is compiled separately and linked in the main target:`myAsyncScript`
