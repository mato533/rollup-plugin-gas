
var global = this;
function basic() {};
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  global.basic = () => {
    console.log("test");
  };

}));
