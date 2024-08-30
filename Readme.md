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
2. MJS (ES Module) : We need to write type="module" in our package.json file to use ES module
   - We need to do to export is: export var name and to import, we need to simply do import var name from filename.
 