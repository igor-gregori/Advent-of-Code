import { input } from '../input.js'

const WORD = 'XMAS'
const WORD_LEN = WORD.length

const DIRECTIONS = {
    NORTH: [-1, 0],
    SOUTH: [1, 0],
    EAST: [0, 1],
    WEST: [0, -1],
    NORTHEAST: [-1, 1],
    NORTHWEST: [-1, -1],
    SOUTHEAST: [1, 1],
    SOUTHWEST: [1, -1],
}

const indexOfX = []

for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input[i].length; j++)
        if (input[i][j] === 'X')
            indexOfX.push([i, j])


function findWord(i, j, deltaRow, deltaCol) {
    for (let k = 0; k < WORD_LEN; k++) {
        const newRow = i + k * deltaRow
        const newCol = j + k * deltaCol

        if (
            newRow < 0 ||
            newRow >= input.length ||
            newCol < 0 ||
            newCol >= input[newRow].length ||
            input[newRow][newCol] !== WORD[k]
        ) {
            return false
        }
    }
    return true
}

let wordCount = 0

for (const [i, j] of indexOfX)
    for (const [deltaRow, deltaCol] of Object.values(DIRECTIONS))
        if (findWord(i, j, deltaRow, deltaCol))
            wordCount++

console.log(wordCount)
