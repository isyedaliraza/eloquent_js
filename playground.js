const greet = function (name) {
  console.log("Hello, " + name);
};

greet("Ali");

// Each local scope can see the global scope and all the outer local scopes, this type of scoping is lexical scoping.

function paint(color) {
  const circle = function (radius) {
    return `${color} circle with radius of ${radius}.`;
  };

  const square = function (area) {
    return `${color} square with area of ${area}.`;
  };

  console.log(circle(2.5));
  console.log(square(10));
  /*
		console.log(radius); // ReferenceError: radius is not defined
	* */
}

paint("Red");

// In the above paint function, the local scopes of circle and square functions can see outer scope bindings e.g. color
// But paint function there is no radius and area bindings. If we try to call these it will give error.

const addTask = (title, description) => {
  console.log(`Task: ${title}\n${description}`);
};

addTask("Go to gym", "Go to the gym at 15:00 for 1 hour.");

/*

// In javascript the computer has to keep track of the current context
// where it is in the code. This context is kept in call stack. Call stack
// has a size. The following code example will exceed the call stack and
// result in RangeError: Maximum call stack size exceeded


function chicken() {
	return egg();
}

function egg() {
	return chicken();
}

console.log(chicken() + "came first.");

*/

function add(x, y) {
  return x + y;
}

// In javascript any number of arguments can be passed to a function
// regardless of the parameter list. Javascript ignores the extra arguments
console.log("3+3=" + add(3, 3, 10, 15, 20));

function calculateArea(radius, pi = 3.14) {
  return pi * radius * radius;
}

console.log(calculateArea(31));

console.log("A", "B", "C");

function multiplier(factor) {
  return (number) => number * factor;
}

const twice = multiplier(2);

console.log(twice(3));

console.log(2 ** 3);

function findSolution(num) {
  function find(current, history) {
    if (current == num) {
      return history;
    } else if (current > num) {
      return null;
    }

    return (
      find(current + 5, `(${history} + 5)`) ??
      find(current * 3, `(${history} * 3)`)
    );
  }
  return find(1, "1");
}

console.log(findSolution(24));
console.log(findSolution(32));
console.log(Math.min(2, 3, 5, 10));
console.log(Math.max(2, 3, 5, 10));

const min = (a, b) => (a < b ? a : b);

console.log(min(0, 10));
console.log(min(0, -10));

function isEven(num) {
  if (num < 0) {
    return false;
  } else if (num == 0) {
    return true;
  } else if (num == 1) {
    return false;
  }

  return isEven(num - 2);
}

console.log(`50 is even? ${isEven(50)}`);
console.log(`75 is even? ${isEven(75)}`);
console.log(`-1 is even? ${isEven(-1)}`);

function countChar(string, char) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] == char) count += 1;
  }
  return count;
}

function countBs(string) {
  return countChar(string, "B");
}

console.log(countBs("BOB"));

console.log(countChar("kakkerlak", "k"));

let name = "Syed Ali Raza";
console.log("The length of my name is ", name.length);
console.log("My name in uppercase is ", name.toUpperCase());
console.log("My name in lowercase is ", name.toLowerCase());

let cities = [
  "Dublin",
  "London",
  "New York",
  "Istanbul",
  "Muscat",
  "Dubai",
  "Islamabad",
];
console.log("The total cities in my array are ", cities.length);
cities.push("Paris");
console.log("Cities: ", cities);
console.log("I popped ", cities.pop());
console.log("Remaining Cities: ", cities);

let getPizza = (size) => ({ name: "Desi Style", size: size, spicy: false });

console.log(getPizza(9));

let employee = {
  name: "john doe",
  age: 32,
  position: "Engineer",
};

console.log(Object.keys(employee));
delete employee.position;
console.log(Object.keys(employee));
console.log("delete" in employee);
Object.assign(employee, { position: "engineer" });
console.log(Object.keys(employee));

let object1 = { id: 1, value: 0 };
let object2 = object1;
let object3 = { id: 1, value: 0 };
console.log(object1 == object2);
console.log(object1 == object3);

object2.value += 1;
console.log(object1.value);
console.log(object3.value);

let journal = [];

function addEntry(events, squirrel) {
  // Shorthand version of events: events can be used like below
  journal.push({ events, squirrel });
}

addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(
  [
    "work",
    "ice cream",
    "cauliflower",
    "lasagna",
    "touched tree",
    "brushed teeth",
  ],
  false,
);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

console.log(journal);

/*
 * Most significant is squirrel variable
 * Least significant is event variable
 * 0 -> 00 i.e. squirrel (0) and event (0)
 * 1 -> 01 i.e. squirrel (0) and event (1)
 * 2 -> 10 i.e. squirrel (1) and event (0)
 * 3 -> 11 i.e. squirrel (1) and event (1)
 *
 * */
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2]),
    )
  );
}

console.log(phi([76, 9, 4, 1]));

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let entry of journal) {
    let index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }

  return table;
}

const JOURNAL = require("./ch4/journal.js");
console.log(tableFor("pizza", JOURNAL));

function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) events.push(event);
    }
  }
  return events;
}

for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ": " + correlation);
  }
}

for (let entry of JOURNAL) {
  if (
    entry.events.includes("peanuts") &&
    !entry.events.includes("brushed teeth")
  ) {
    entry.events.push("peanut teeth");
  }
}

console.log("peanut teeth: " + phi(tableFor("peanut teeth", JOURNAL)));

// JavaScript arrays has push,pop,shift,unshift methods for adding and removing items
// from an array. The difference is the direction of operation. Push and pop modify
// items from the end of the array. Shift and unshift modify the array from start.

const todoList = [];

function remember(task) {
  todoList.push(task);
}

function getTask() {
  return todoList.shift();
}

function doUrgent(task) {
  todoList.unshift(task);
}

remember("Fold laundry");
remember("Throw trash");
console.log(todoList);
doUrgent("Do work");
console.log(todoList);

// To search for an element in an array
// we have indexOf and lastIndexOf methods

console.log([1, 2, 6, 4, 3, 10].indexOf(2));
console.log([1, 2, 6, 4, 2, 10].lastIndexOf(2));

// slice method returns a sub array from an array
// we can give start and end index optionally.
// Start is inclusive and end is exclusive.

console.log([2, 10, 85, 1, 13, 90, 37, 8, 5].slice(0, 3));
console.log([2, 10, 85, 1, 13, 90, 37, 8, 5].slice(3));
console.log([2, 10, 85, 1, 13, 90, 37, 8, 5].slice());

function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

console.log(remove(["a", "b", "c", "d", "e"], 2));

console.log(["ab", "cd"].concat(3));

// Strings also have array like methods such as, slice and indexOf

console.log("Hello, World!".slice(3, 6));
console.log("Hello, JavaScript.".indexOf("rip"));
console.log("      \n okay      \n\t".trim());

console.log("7".padStart(4, "0"));

// Split converts a String to an Array on a delimeter.
// Join will join the Array back to String.

console.log("Hello I am a Software Engineer.".split(" ").join("+"));

console.log("HA".repeat(3));
