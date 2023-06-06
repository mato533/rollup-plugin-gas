
var global = this;
function echo() {};
function hello() {};
function plus() {};
function minus() {};
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  /*!***************!*\
    !*** echo.js ***!
  \*!***************!*/
  const echo = (message) => {
    return message;
  };

  /*!****************!*\
    !*** basic.js ***!
  \*!****************!*/
  /**
   * Return write arguments.
   */
  global.echo = echo;

  global.hello = function () {
    console.log("hello");
  };

  function plus(x, y) {
    return x + y;
  }
  function minus(x, y) {
    return x - y;
  }
  (global.plus = plus), (global.minus = minus);

}));
