
var global = this;
/**
 * Comment for echo
 */
function echo() {};
/**
 * Comment foo
 */
function foo(message) {};
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const echo = (message) => {
    return message;
  };

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
