import { input } from '../input.js'

function generateOperators(chars, len) {
    const result = []

    function helper(current) {
        if (current.length === len) {
            result.push(current)
            return
        }
        for (const char of chars)
            helper(current + char)
    }

    helper('')
    return result
}

function evaluateEquation(equation) {
    const tokens = equation.match(/\d+|[+\-*/]/g);
    if (!tokens)
        throw new Error('Invalid equation');


    let result = parseInt(tokens[0], 10);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i]
        const nextValue = parseInt(tokens[i + 1], 10);

        if (isNaN(nextValue))
            throw new Error('Invalid number in equation');


        switch (operator) {
            case '+':
                result += nextValue
                break
            case '-':
                result -= nextValue
                break
            case '*':
                result *= nextValue
                break
            case '/':
                if (nextValue === 0)
                    throw new Error('Division by zero')
                result /= nextValue
                break
            default:
                throw new Error(`Invalid operator: ${operator}`);
        }
    }

    return result
}

let possibleEquations = []

for (const equation of input) {
    const lengthToGen = equation.length - 2
    const allOperators = generateOperators(['*', '+'], lengthToGen)

    for (const operator of allOperators) {
        let j = 0
        let equationToEval = ''
        while (true) {
            if (equation.length - 2 === j) {
                equationToEval += equation[j + 1]
                break
            }
            equationToEval += equation[j + 1] + operator[j]
            j++
        }
        let result = evaluateEquation(equationToEval)
        if (result === equation[0]) {
            possibleEquations.push(equation)
            break
        }
    }
}

let sum = 0
for (const equation of possibleEquations) sum += equation[0]
console.log('sum:', sum)
