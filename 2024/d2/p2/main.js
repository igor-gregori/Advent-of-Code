import { input } from '../input.js ';

function isIncreasing(arr) {
    for (let i = 0; i < input.length - 1; i++) {
        if (arr[i] >= arr[i + 1]) return false
    }
    return true
}

function isDecreasing(arr) {
    for (let i = 0; i < input.length - 1; i++) {
        if (arr[i] <= arr[i + 1]) return false
    }
    return true
}

function hasLowDiff(arr) {
    const mod = (n) => n < 0 ? n * -1 : n;
    for (let i = 0; i < input.length - 1; i++) {
        const diff = mod(arr[i] - arr[i + 1])
        if (diff < 1) return false
        if (diff > 3) return false
    }
    return true
}

let secReports = 0

const isSec = (arr) => (isIncreasing(arr) || isDecreasing(arr)) && hasLowDiff(arr)

for (let i = 0; i < input.length; i++) {
    if (isSec(input[i])) {
        secReports += 1
    } else {
        for (let j = 0; j < input[i].length; j++) {
            const newArr = structuredClone(input[i])
            newArr.splice(j, 1)
            if (isSec(newArr)) {
                secReports += 1
                break
            }
        }
    }
}

console.log(secReports)
