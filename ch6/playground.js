function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = { type: "white", speak: speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my fur and whiskers");
hungryRabbit.speak("Got any carrots?");

speak.call(hungryRabbit, "Oh I am so hungry.");

// Regular functions define their [this] binding based on the way they are called.

// Arrow functions don't define their own [this] binding and access binding of wrapping scope.

let finder = {
  find(array) {
    return array.some((v) => v == this.value);
  },
  find2(array) {
    // Inside array.some if we use function keyword to define
    // the anonymous function, [this] will be undefined
    return array.some(function (v) {
      return v == this.value;
    });
  },
  value: 5,
};

console.log(finder.find([4, 5]));
console.log(finder.find2([4, 5]));

// A prototype is an object that stores a type's properties and methods
// Every object in javascript has a prototype object except the Object.prototype

let obj1 = {};

// When we created the above empty object
// Object.prototype was added to it automatically
// Object.prototype contains many methods and properties e.g. toString method

// When we access a property of an object, JavaScript searches its prototype object
// recursively until it reaches an object which has no prototype [Object.prototype]

console.log(obj1.toString);
console.log(obj1.toString());
console.log(Object.getPrototypeOf(obj1) == Object.prototype); // -> true
console.log(Object.getPrototypeOf(Object.prototype)); // -> null

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'.`);
  },
};

let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");

// Before 2015 functions were used to define classes in JavaScript

function ArchaicRabbit(type) {
  this.type = type;
}

ArchaicRabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'.`);
};

let oldSchoolRabbit = new ArchaicRabbit("old school");
oldSchoolRabbit.speak("Old is gold.");

// class keyword was introduced in 2015 to define classes

class Rabbit {
  constructor(type) {
    this.type = type;
  }

  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'.`);
  }
}

let killerRabbit = new Rabbit("killer");
killerRabbit.speak("I hate you");

// The prototype of the constructor is [Function.prototype]
// because constructor is a fuction. This prototype is used to
// create instances
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);

// Only methods are added to the class's prototype
// properties are added to per instance
class Particle {
  speed = 0;
  constructor(position) {
    this.position = position;
  }
  accelerate() {
    console.log(`The particle is moving with ${this.speed} speed.`);
  }
}

// In JavaScript the class keyword can be used as statement and expressions
// When used in statments and expressions it returns the constructor

let object = new (class {
  getWord() {
    return "hello";
  }
})();

console.log(object.getWord());

// Private properties in javascript can be defined with # before the name

class SecretiveObject {
  #getSecret() {
    return "I ate all the plums";
  }

  interrogate() {
    let shallISayIt = this.#getSecret(); // type: ignore
    return "never";
  }
}

let secretiveObj = new SecretiveObject();
console.log(secretiveObj.interrogate());

// Properties can be overrided by redefining them

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
killerRabbit.teeth = "long, sharp and bloody";
console.log(killerRabbit.teeth);
console.log(new Rabbit("basic").teeth);
console.log(Rabbit.prototype.teeth);

// Array has prototyped its own toString method

console.log(Object.prototype.toString == Array.prototype.toString);
console.log([1, 2].toString());
console.log(Object.prototype.toString.call([1, 2]));

// In JavaScript we can use objects to map values to keys for example

let ages = {
  Julia: 60,
  Jack: 30,
  Borris: 10,
};

console.log(`Julia age is ${ages["Julia"]}`);
console.log(`Is Jack's age known? ${"Jack" in ages}`); // ––> true
console.log(`Is toString's age known? ${"toString" in ages}`); // ——> true

// Because object keys are the property names it is dangerous to use it as a map
// Also, toString comes from Object.prototype and is not a key we wanted.

// One solution is to use the Object.create(null) it will give us an object
// without the Object.prototype

console.log(`Is toString's age known? ${"toString" in Object.create(null)}`);

// JavaScript offers a special data structure [Map] which can be used to map values
// to the keys. [Map] also takes keys of any type whereas [Object] properties can be
// strings only.

let mappedAges = new Map();
mappedAges.set("Julia", 60);
mappedAges.set("Borris", 10);
mappedAges.set("Jack", 30);

console.log(`What is Julia's age? ${mappedAges.get("Julia")}`); // ——> 60
console.log(`Is Jack's age known? ${mappedAges.has("Jack")}`); // ——> true
console.log(`Is toString's age known? ${mappedAges.has("toString")}`); // ——> false

// Object has a method [Object.keys] which returns object properties only
// without prototype properties
console.log(Object.keys(ages));

// Object has a method [Object.hasOwn] which checks for a key presence without
// taking prototype properties into account.
console.log(Object.hasOwn(ages, "toString")); // ——> false

// In JavaScript we have String function that converts an object to its
// meaningful string representation by calling object's [toString] method

console.log(String(mappedAges));

// Now some types have their own implementation of toString method
// for example Arrays

console.log(String([1, 2, 3])); // —> 1, 2, 3

// Poly means many and morph means form, polymorphism is a powerful
// concept where different types or classes conform to same interface
// while providing their own implementations. If a code works with
// one type we can plug in other types and the code will work fine.

Rabbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};

console.log(String(killerRabbit));

// We can add properties in an object that are not stored directly

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
temp.fahrenheit = 99;
console.log(temp.celsius);

let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);

// In 2015 symbols were added in JavaScript
// Because it was difficult for an object to conform to two
// interfaces with same property names
let length = Symbol("length");

let myTrip = {
  length: 2,
  0: "John",
  1: "Doe",
  [length]: 2025,
};

console.log(myTrip.length, myTrip[length]);

class List {
  constructor(value, rest) {
    this.value = value;
    this.rest = rest;
  }

  get length() {
    return 1 + (this.rest ? this.rest.length : 0);
  }

  static fromArray(array) {
    let rest = null;
    for (let i = array.length - 1; i >= 0; i--) {
      rest = new this(array[i], rest);
    }
    return rest;
  }
}

class ListIterator {
  constructor(list) {
    this.list = list;
  }

  next() {
    if (this.list == null) {
      return { done: true };
    }

    let value = this.list.value;
    this.list = this.list.rest;
    return { value, done: false };
  }
}

List.prototype[Symbol.iterator] = function () {
  return new ListIterator(this);
};

let list = List.fromArray([1, 2, 3]);
for (let item of list) {
  console.log(item);
}

// Iterable objects also work with spread operator ...
console.log([..."PCI"]);

// We can use extend to create a sub-class that inherits
// the properties of it's super-class

class LengthList extends List {
  #length;
  constructor(value, rest) {
    super(value, rest);
    this.#length = super.length;
  }

  get length() {
    return this.#length;
  }
}

console.log(LengthList.fromArray([1, 2, 3]).length);

// We can check whether an object is derived from a class
// using instanceof operator

console.log([1, 2, 3] instanceof Array); // —> true
