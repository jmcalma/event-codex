//A6 used for A6, test add function.
//Unit tester is called nodeunit found on https://github.com/caolan/nodeunit
//install nodeunit globally via npm, run 'nodeunit 'scripts.js'
function add(a, b) {//Alex's method
    return a + b;
}

function mult(a, b) {//Jerahmeel's method
	return a * b;
}

exports.testAdd = function(test) {//Alex's test
    test.equals(4, add(2,2));
    test.done();
}

exports.testMult = function(test) {//Jerahmeel's test
	test.equals(55, mult(11,5));
	test.done();
}
