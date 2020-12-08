export function evaluate(expr) {
    console.log("Eval")
    let left = parseFloat(expr.match(/[0-9]+(\.[0-9]+)?/));
    console.log(left);
    let op = expr.match(/[+\-*/]/)[0];
    console.log(op);
    let right = parseFloat(expr.match(/[0-9]+(\.[0-9]+)?$/));
    console.log(right);
    var calc = {
        '+': function(a, b) { return a + b },
        '-': function(a, b) { return a - b },
        '*': function(a, b) { return a * b },
        '/': function(a, b) { return a / b }
    }
    let answer = calc[op](left, right)
    return Number.isInteger(answer) ? answer : answer.toFixed(3);
}