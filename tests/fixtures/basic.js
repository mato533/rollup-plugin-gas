import echo from "./echo";
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
