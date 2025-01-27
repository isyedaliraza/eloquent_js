function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = { type: "white", speak: speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my fur and whiskers");
hungryRabbit.speak("Got any carrots?");

speak.call(hungryRabbit, "Oh I am so hungry.");

// Normal functions can't access this binding of their wrapping scope
// because they define their this variable based on how they are called.

// Arrow functions don't bind their this so they behave differently and
// they can access this binding of their wrapping scope.

let finder = {
  find(array) {
    return array.some((v) => v == this.value);
  },
  value: 5,
};

console.log(finder.find([4, 5]));

let greet = () => console.log(`Hello, ${this.name}!`);
function greet2() {
  console.log(`Hello, ${this.name}!`);
}

greet();
greet2();

let receptionist = {
  greet,
  greet2,
  greet3: function () {
    console.log(`Hello, ${this.name}.`);
  },
  name: "Emma",
};

receptionist.greet();
receptionist.greet2();
receptionist.greet3();

// Regular functions define their this binding based on the way they are called.
// Arrow functions don't define their own this binding and access binding of wrapping scope.
