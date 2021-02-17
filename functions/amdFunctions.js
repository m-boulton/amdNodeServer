// const fs = require("fs");

// // JSON Handling Functions
// function jsonReader(filePath, cb) {
//   fs.readFile(filePath, "utf-8", (err, fileData) => {
//     if (err) {
//       return cb && cb(err);
//     }
//     try {
//       const object = JSON.parse(fileData);
//       return cb && cb(null, object);
//     } catch (err) {
//       return cb && cb(err);
//     }
//   });
// }

// //   Json Reading function
// async function navLookup() {
//   await jsonReader("./assets/amd.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(
//         "this is inside the reader func ",
//         data.pages.processors,
//         " end"
//       );
//       async function name() {
//         let blah = await data.pages.processors;
//         return blah;
//       }
//       name();
//     }
//   });
// }
// module.exports = { navLookup };
