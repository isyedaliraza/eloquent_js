/*
 ==============================================================================
 Chapter 5: Higher Order Functions
 ==============================================================================
 */

const SCRIPTS = require("./scripts.js"); // type: ingore

// Higher order functions enable us to write code
// in more abstract and high level way. For example,
// we can create a higher order function repeat, that
// imitates a for loop but is much more readable.
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
repeat(10, () => console.log("Hello, World!"));

// Array has many higher order functions that allow
// us to do a variety of tasks over an array.

// forEach: loops over each element in an array

let oldestScript = SCRIPTS[0];
SCRIPTS.forEach((script) => {
  if (script.year <= oldestScript.year) {
    oldestScript = script;
  }
});

console.log(oldestScript);

// filter: returns a new array that match the given predicate

let ttbScripts = SCRIPTS.filter((s) => s.direction == "ttb");
console.log(ttbScripts);

// map: transforms the array elements into a different type

console.log(SCRIPTS.map((script) => script.name));

// reduce: converts the element of array into a single value

function characterCount(script) {
  let count = 0;
  for (range of script.ranges) {
    count += range[1] - range[0];
  }
  return count;
}

let biggestScript = SCRIPTS.reduce((a, b) =>
  characterCount(a) < characterCount(b) ? b : a,
);
console.log(biggestScript);
