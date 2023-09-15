// Synchronous
// Synchronous Code (Blocking Code)
const fs = require("fs");

// Blocking code execution
const input = fs.readFileSync("input.txt", "utf-8");
console.log(input);

/**
 * Each statement is processed one after another
 * 1) File system model is required
 * 2) File is read
 * 3) Log file to the console
 * Code can only be executed line by line
 */

// Asynchronous Code

const fs = require("fs");

// readFile() is asynchronous
fs.readFile("input.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Reading file..."); // printed FIRST to the console

/**
 * readFile() accepts a callback function and start reading the file in the background
 * The next line of code is executed before the file is read
 * Once the file is read, the callback function is called and the data will be printed to console
 */

// Heavy work code can work in the background and once the code is completed, a callback function registered before is called to handle the result
