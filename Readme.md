# Notes for Node.js

- Node js is a open source, cross platform JS engine, written in C++ and it is built on Google's V8 JS engine.
  - Event Driven Architecture.
  - Asynchronous, Non-blocking i/o.
  - Built on Google's V8 Engine.
- V8 is Google JS enigne which is written in C++ and it can be embedded into and C++ application.
- Node js provides a global object and it is not a part of V8, It is inside Node js like there are more super powers other than V8.
- By default we can not use var and methods from one module to another because it is protected, We have to export the modules.
- If we want to export multiple variables, we can do that by using object.

# Two ways to import and export modules

1. CJS (Common JS Module) : By Default node js uses CJS for exporting and importing modules.
   - We can do *module.exports* to export and to import we can do *require*
   - Code runs in synchronous way ( which means it blocks the code for a while until the required file is imported and executed).
   - Older way.
   - It runs in Non-strict mode
2. MJS/ESM (ES Module) : We need to write type="module" in our package.json file to use ES module
   - We need to do to export is: export var name and to import, we need to simply do import var name from filename.
   - We can use asynchronous 
   - It is the newer way.
   - It runs in Strict mode.

# require('./path') in node js

All the code of the module is wrapped inside a function(IIFE), that is why we can not access it directly until we export it: module.exports.
 - IIFE(JS concept): Immediately Invoked Function Expression.    

5 Steps to require('path')
 1. Resolving the module
 2. Loading the module
 3. Wraps inside IIFE
 4. Evaluation
 5. Caching
 
 # Node JS V8 Libuv
 
In node js there are many super powers other than V8 engine. 

- V8 JS Engine can only perform synchronous way, that means it can only execute the code line by line in synchronous way. But suppose if a task is taking so much time then it will block the thread, in that case in Node js there is dep/lib which is known as LIBUV which helps to perform Asynchronous I/O or Non-blocking I/O in a simple way and it is written in C language, because OS needs a low level language to communicate with.

- Libuv kind of acts like a middleware between our OS and the V8 JS engine in Node js. Node js is asynchronous because of libuv
 - Libuv has thread pool and also event loop and much more.

- Whenever there is a async task V8 JS enigne just offload it to libuv. 