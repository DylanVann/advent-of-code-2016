const test = require('tape')
const fs = require('fs')

function decrypMessage(input, ascending) {
  return input
    .split('\n')
    .map(l => l.split(''))
    .reduce((cols, line) => {
      line.map((c, i) => {
        cols[i] = cols[i] || {}
        cols[i][c] = cols[i][c]
          ? cols[i][c] + 1
          : 1
      })
      return cols
    }, [])
    .reduce((message, col) => {
      const keys = Object.keys(col)
      const vals = Object.values(col)
      const zipped = vals.map((v, i) => ({ letter: keys[i], count: v}))
      const sortedZipped = zipped.sort((p, n) => {
        const mult = ascending ? 1 : -1
        if (p.count < n.count) return mult * 1
        if (p.count === n.count) return 0
        if (p.count > n.count) return mult * -1
      })
      return message + sortedZipped[0].letter
    }, '')
}

test('day6 - decrypMessage', t => {
  const input = fs.readFileSync('./6_test.txt', 'utf8')
  t.equal(decrypMessage(input, true), 'easter')
  t.equal(decrypMessage(input, false), 'advent')
  t.end()
})

const input = fs.readFileSync('./6_input.txt', 'utf8')
console.log('Day 4 - Ans.', decrypMessage(input, true))
console.log('Day 4 B - Ans.', decrypMessage(input, false))
