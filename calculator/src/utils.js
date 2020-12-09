export function evaluate(expr) {
    let left = parseFloat(expr.match(/[0-9]+(\.[0-9]+)?/));
    let op = expr.match(/[+\-*/]/)[0];
    let right = parseFloat(expr.match(/[0-9]+(\.[0-9]+)?$/));
    var calc = {
        '+': function(a, b) { return a + b },
        '-': function(a, b) { return a - b },
        '*': function(a, b) { return a * b },
        '/': function(a, b) { return a / b }
    }
    let answer = calc[op](left, right)
    return Number.isInteger(answer) ? answer : answer.toFixed(3);
}