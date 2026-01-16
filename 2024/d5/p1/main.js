import { rules, atts } from '../input.js'

const validAtts = []

for (const att of atts) {
    let isValid = true

    for (const rule of rules) {
        const [p1, p2] = rule
        const idxP1 = att.findIndex((n) => n === p1)
        const idxP2 = att.findIndex((n) => n === p2)

        if (idxP1 === -1) continue
        if (idxP2 === -1) continue

        if (idxP1 > idxP2) {
            isValid = false
            break
        }
    }

    if (isValid)
        validAtts.push(att)
}

let sumNumMidPages = 0

for (const att of validAtts) {
    let midPage = att[(att.length / 2) - 0.5]
    sumNumMidPages += midPage
}

console.log(sumNumMidPages)
