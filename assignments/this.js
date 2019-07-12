/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Global Binding: If a function is defined in the global scope, then "this" will point to the window. If 'use strict;' is in use, then "this" will be undefined.
* 2. Implicit Binding: "this" is bound to the instance of the object that invoked the function using "this."
* 3. Explicit Binding: The functions apply, call, and bind allow the programmer to explicitly assign the context for "this."
* 4. New Keyword Binding: "this" is bound to the instance of the object being created by the new keyword.
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
function func () {
   console.log(this); //prints the window object to the console.
}
func();


// Principle 2

// code example for Implicit Binding
const myObj = {
   name: "My Object",
   func: function () {
      console.log(this); //prints myObj object to the console
   }
}
myObj.func();


// Principle 3

// code example for New Binding
const MathObj = function (num1, num2) {
   this.num1 = num1;
   this.num2 = num2;
   this.add = function () {
      console.log(`${this.num1} + ${this.num2} = ${this.num1 + this.num2}`); //prints result of adding the two numbers.
   };
};
const calcOne = new MathObj(20, 35);
calcOne.add();
const calcTwo = new MathObj(15, 65);
calcTwo.add();


// Principle 4

// code example for Explicit Binding
calcOne.add.call(calcTwo); //prints the result of adding the numbers set in calcTwo.