const add = function (a, b) {
    return a + b;
};
  
const subtract = function (a, b) {
    return a - b;
};
  
const sum = function (array) {
    return array.reduce((total, current) => total + current, 0);
};
  
const multiply = function (array) {
    return array.reduce((product, current) => product * current);
};

const divide = function (array) {
    return array.reduce((product, current) => product / current);
};

