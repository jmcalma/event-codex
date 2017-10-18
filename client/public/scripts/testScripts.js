//A6 used for A6, test add function.
//Unit tester is called nodeunit found on https://github.com/caolan/nodeunit
//install nodeunit globally via npm, run 'nodeunit 'scripts.js'
function add(a, b) {
    return a + b;
}

exports.testAdd = function(test) {
    test.equals(4, add(2,2));
    test.done();
}

