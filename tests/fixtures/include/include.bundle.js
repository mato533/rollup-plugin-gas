
var global = this;
function includeTest() {};
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  /*!**************!*\
    !*** foo.js ***!
  \*!**************!*/
  global.excludeFunction = () => {
    console.log("excludeFunction");
  };

  const foo = function () {
    console.log("foo");
  };

  /*!******************!*\
    !*** include.js ***!
  \*!******************!*/

  global.includeTest = function () {
    console.log("includeTest");
    foo();
  };

}));
