import { input, initGuardPos } from '../input.js'

let guardPos = initGuardPos

function nextStep(row, col, dir) {
    if (dir === 'up') return [row - 1, col]
    if (dir === 'down') return [row + 1, col]
    if (dir === 'right') return [row, col + 1]
    if (dir === 'left') return [row, col - 1]
}

function nextDir(dir) {
    if (dir === 'up') return 'right'
    if (dir === 'down') return 'left'
    if (dir === 'right') return 'down'
    if (dir === 'left') return 'up'
}

const distinctPos = []

while (true) {
    let [row, col, dir] = guardPos

    if (!distinctPos.find((p) => p[0] === row && p[1] === col))
        distinctPos.push(guardPos)

    let [nextRow, nextCol] = nextStep(row, col, dir)

    if (nextRow < 0) break
    if (nextRow >= input.length) break
    if (nextCol < 0) break
    if (nextCol >= input[0].length) break

    if (input[nextRow][nextCol] !== '#')
        guardPos = [nextRow, nextCol, dir]
    else
        guardPos[2] = nextDir(dir)

}

console.log(distinctPos.length)
