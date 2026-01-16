import { input } from '../input.js'

const regex = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g

const matches = []
let match

while ((match = regex.exec(input)) !== null) {
    matches.push(match[0])
}

const validMatches = []
let validFlag = true

for (const instruction of matches) {
    if (instruction === 'do()')
        validFlag = true
    else if (instruction === 'don\'t()')
        validFlag = false

    if (validFlag && instruction[0] === 'm')
        validMatches.push(instruction)
}

let result = 0
for (const vm of validMatches) {
    const cleanVm = vm.replace('mul(', '').replace(')', '')
    const [n1, n2] = cleanVm.split(',')
    result += n1 * n2
}

console.log(result)
