import { rules, atts } from '../input.js'

const attsToCorrect = []

for (const att of atts) {
    for (const rule of rules) {
        const [p1, p2] = rule
        const idxP1 = att.findIndex((n) => n === p1)
        const idxP2 = att.findIndex((n) => n === p2)

        if (idxP1 === -1) continue
        if (idxP2 === -1) continue

        if (idxP1 > idxP2) {
            attsToCorrect.push(att)
            break
        }
    }
}

for (const att of attsToCorrect) {
    for (let i = 0; i < rules.length; i++) {
        const [p1, p2] = rules[i]
        const idxP1 = att.findIndex((n) => n === p1)
        const idxP2 = att.findIndex((n) => n === p2)

        if (idxP1 === -1) continue
        if (idxP2 === -1) continue

        if (idxP1 > idxP2) {
            let aux = att[idxP1]
            att[idxP1] = att[idxP2]
            att[idxP2] = aux
            i = 0
        }
    }
}

let sumNumMidPages = 0

for (const att of attsToCorrect) {
    let midPage = att[(att.length / 2) - 0.5]
    sumNumMidPages += midPage
}

console.log(sumNumMidPages)
