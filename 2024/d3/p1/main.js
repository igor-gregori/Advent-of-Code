import { input } from '../input.js'

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g

const matches = []
const digits = []
let match

while ((match = regex.exec(input)) !== null) {
    matches.push(match[0])
    digits.push([match[1], match[2]])
}

let result = 0
for (const d of digits) {
    result += d[0] * d[1]
}

console.log(result)
