
var global = this;
function echo() {};
function foo(message) {};
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

  /*!*************************!*\
    !*** comment-module.js ***!
  \*!*************************!*/
  // header comment
  /**
   * Comment for echo
   */
  global.echo = echo;

  /**
   * Comment foo
   */
  global.foo = (message) => {
    // comment in the logic
    console.log(message);
  };
  // end Comment

}));
