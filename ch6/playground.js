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
