/***********************MERGING OBJECTS WITH SAME KEYS**********************************************/

// const object1 = {
//   101: {
//     first: "darshan",
//     last: "marathe",
//   },
//   102: {
//     first: "surajkumar",
//     last: "prajapati",
//   },
// };

// const object2 = {
//   101: {
//     middle: "ravindra",
//   },
//   102: {
//     middle: "rameshkumar",
//   },
// };

// let output = {};
// const merge = (object1, object2) => {
//   for (key in object1) {
//     output[`${key}`] = { ...object1[key], ...object2[key] };
//   }
//   console.log(output);
// };

// merge(object1, object2);

/********************************************************************************************* */

/**********************************DYNAMIC OBJECT KEY*********************************************** */
// object = {};

// dom = {
//   id: 2,
//   name: "darshan",
// };

// object[dom.id] = dom;

// console.log(object);

/**************************************************************************************************************** */

/******************************************ASYNCHRONOUS TESTING **************************************************/
// documents = [1, 2, 3, 4, 5];
// op = [];
// documents.forEach((element) => {
//   op.push(element);
// });
// console.log(op);

/****************************************************************************************************************** */

/******************************************OBJECT COLLECTION **************************************************/

// let object1 = {
//   id: 1,
//   name: "darshan",
// };

// let object2 = {
//   id: 1,
//   l_name: "marathe",
// };

// let object3 = {
//   id: 2,
//   loc: "abc",
// };

// let obj = {
//   object1,
//   object2,
//   object3,
// };

// console.log(obj);
/************************************************************************************************************ */

/********************************************PROMISE.ALL******************************************************** */
let op;
let exp1 = new Promise((resolve, reject) => {
  resolve(3 + 2);
}).then((res) => {
  op = res;
});
let exp2 = new Promise((resolve, reject) => {
  resolve([
    {
      id: 2,
      name: "sk",
    },
    {
      id: 1,
      name: "darshan",
    },
  ]);
});
let exp3 = new Promise((resolve, reject) => {
  resolve({
    id: 1,
    l_name: "marathe",
  });
});

Promise.all([exp2, exp3]).then((res) => {
  console.log({ res, op });
  res.forEach((obj) => {
    console.log(obj);
  });
});
/************************************************************************************************************ */
