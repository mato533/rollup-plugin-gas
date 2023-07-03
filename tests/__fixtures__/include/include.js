import { foo } from "./foo";

global.includeTest = function () {
  console.log("includeTest");
  foo();
};
