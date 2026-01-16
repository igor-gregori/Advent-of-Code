import { input } from '../input.js'

const indexOfA = []

for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input[i].length; j++)
        if (input[i][j] === 'A')
            indexOfA.push([i, j])

function countWords(i, j) {
    let wordCount = 0

    if (
        i + 1 < input.length
        && i - 1 >= 0
        && j + 1 < input[i].length
        && j - 1 >= 0
    ) {
        const wordUp = input[i + 1][j - 1] + input[i][j] + input[i - 1][j + 1]
        if (wordUp === "MAS" || wordUp === "SAM")
            wordCount++

        const wordDown = input[i - 1][j - 1] + input[i][j] + input[i + 1][j + 1]
        if (wordDown === "MAS" || wordDown === "SAM")
            wordCount++
    }

    return wordCount === 2
}


let wordCount = 0
for (const [i, j] of indexOfA)
    if (countWords(i, j))
        wordCount++

console.log(wordCount)
