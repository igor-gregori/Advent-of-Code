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

function run(simMap, guardPos) {
    const obstructions = []

    while (true) {
        let [row, col, dir] = guardPos

        let [nextRow, nextCol] = nextStep(row, col, dir)

        if (nextRow < 0) return 'EOI'
        if (nextRow >= simMap.length) return 'EOI'
        if (nextCol < 0) return 'EOI'
        if (nextCol >= simMap[0].length) return 'EOI'

        if (simMap[nextRow][nextCol] !== '#') {
            guardPos = [nextRow, nextCol, dir]
        }
        else {
            if (obstructions.find((o) => o.toString() === [nextRow, nextCol, dir].toString()))
                return 'LOOP'

            obstructions.push([nextRow, nextCol, dir])

            guardPos[2] = nextDir(dir)
        }

    }
}

function replaceChar(input, i, j, newChar) {
    const row = input[i]
    input[i] = row.substring(0, j) + newChar + row.substring(j + 1)
}

let loopCount = 0

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] === '#') continue

        replaceChar(input, i, j, '#');

        let result = run(input, [...guardPos])

        // Debug
        // console.log(`Simulação do [${i},${j}] deu: `, result)

        if (result === 'LOOP')
            loopCount++

        replaceChar(input, i, j, '.');
    }
}

console.log(loopCount)
