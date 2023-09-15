const fs = require('fs');
const http = require('http'); // gives us networking powers like building http server
const url = require('url'); // to parse variables off the urls

const slugify = require('slugify');

const replaceTemplate = require('./modules.js/replaceTemplate');

/////////////////////////
// FILES

/**
 * fs is file systems
 * require('fs') -> we get access to reading and writing data in the file system
 */

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// /* takes 2 arguments:
// 1) Path to file we are reading
// 2) character encoded
// */
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;

// // Writing textOut into a new file called output.txt
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR! 🫥");

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 😁");
//       });
//     });
//   });
// });
// console.log("Will read file!");

/**
 * Node will read start.txt in the background (asynchronously)
 * The code on line 25 will be executed before the callback function is executed (when start.txt file is read!)
 * Once the file is ready, it will call the callback function in the 2nd parameter
 */

////////////////////////
// SERVER

// We use synchronous/blocking code (readFileSync()) as it is top level code and is only executed once at the start when we load the applications

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data); // parses JSON string into a Javascript object/array for the response

const slugs = dataObj.map((el) =>
  slugify(el.productName, {
    lower: true,
  })
);

console.log(slugs);

console.log(
  slugify('Fresh Avocados', {
    lower: true,
  })
);

// Remember that createServer's callback function executes each time there is a new request to the server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); // destructure using {} as there are query and pathname keys in the req.url object

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // Making a new array with the map looping method
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(''); // arrow function implicitly returns the output value without the return statement
    // the join('') method joins all the array elements into a string

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id]; //if query is ?id=0, id = 0

    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data); // sending back the data as JSON string

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    }); // see in "Network" in browser
    res.end('<h1>Page not found!</h1>');
  }

  // executed each time new request hits server (searching for 127.0.0.1:8000 in Chrome!)
});
/** createServer() has a callback function which has access to 2 very important variables:
 * 1) Request Variable/Object
 * 2) Response Variable/Object
 */

const PORT = process.env.PORT || 8000; // Use the PORT environment variable if set, or default to 8000

// Listening for incoming requests from client
server.listen(PORT, '127.0.0.1', () => {
  const url = `http:///localhost:${PORT}`;
  console.log(`Server is running at ${url}`);
});
/**
 * listen() takes in the port as the 1st parameter and host as 2nd parameter
 * port is a subaddress on a host (local host is current laptop -> 127.0.0.1)
 * url link to local host: 127.0.0.1:8000
 */

/** . refers to the directory from which we run the node command in the terminal -> . is the starter folder!!

All Node.js scripts get access to a variable called __dirname (always translates to the directory in which the current script is located!)
*/
