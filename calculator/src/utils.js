export function evaluate(expr) {
    console.log("Eval")
    var left = parseFloat(expr.match(/[0-9]+(.[0-9]+)?/));
    console.log(left);
    var op = expr.match(/[+|-|*|/]/);
    console.log(op);
    var right = parseFloat(expr.match(/[0-9]+(.[0-9]+)?$/));
    console.log(right);
    var calc = {
        '+': function(a, b) { return a + b },
        '-': function(a, b) { return a - b },
        '*': function(a, b) { return a * b },
        '/': function(a, b) { return a / b }
    }
    return calc[op](left, right).toFixed(3);
}