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

for (let i = 0; i < input.length; i++) {
    if (isIncreasing(input[i]) || isDecreasing(input[i])) {
        if (hasLowDiff(input[i])) {
            secReports += 1
        }
    }
}

console.log(secReports)
