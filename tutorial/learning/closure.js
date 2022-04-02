function makeAdder(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
var add5 = makeAdder(5);
var add6 = add5(6);
console.log(add6(7)) // 


// function makeAdder(a) {
//   return function(b) {
//     return a + b;
//   };
// }
// var add5 = makeAdder(5);
// var add20 = makeAdder(20);
// add5(6); // ?
// add20(7); // ?

