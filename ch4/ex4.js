/*

The == operator compares objects by identity, but sometimes you’d prefer
to compare the values of their actual properties.

Write a function deepEqual that takes two values and returns true only
if they are the same value or are objects with the same properties, where
the values of the properties are equal when compared with a recursive call
to deepEqual.

To find out whether values should be compared directly 
(using the === operator for that) or have their properties compared, you
can use the typeof operator. If it produces "object" for both values, you
should do a deep comparison. But you have to take one silly exception into 
account: because of a historical accident, typeof null also produces "object".

The Object.keys function will be useful when you need to go over the
properties of objects to compare them.

*/

function deepEqual(o1, o2) {
  if (typeof o1 == "object" && typeof o2 == "object" && o1 && o2) {
    const k1 = Object.keys(o1);
    for (let key of k1) {
      if (!deepEqual(o1[key], o2[key])) return false;
    }

    const k2 = Object.keys(o2);
    for (let key of k2) {
      if (!deepEqual(o1[key], o2[key])) return false;
    }

    return true;
  }

  return o1 === o2;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
