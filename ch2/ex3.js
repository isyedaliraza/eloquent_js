/*
Write a program that creates a string that represents an 8×8 grid,
using newline characters to separate lines. At each position of the
grid there is either a space or a "#" character. The characters should 
form a chessboard.

Passing this string to console.log should show something like this:
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 

When you have a program that generates this pattern, define a binding
size = 8 and change the program so that it works for any size, outputting
a grid of the given width and height.
 */

const printPattern = function (size) {
  for (let i = 0; i < size; i++) {
    let result = "";
    for (let j = 0; j < size; j++) {
      if (i % 2 == 0) {
	if (j % 2 == 0) result += " ";
	else result += "#";
      }
      else {
	if (j % 2 == 0) result += "#";
	else result += " ";
      }
    }
    console.log(result);
  }
};

let size = 8;
printPattern(size);
