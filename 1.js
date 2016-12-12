const test = require('tape')

function calculateBlocksMoved(input) {
  const initial = {
    x: 0,
    y: 0,
    direction: { x: 0, y: 1 },
  }
  const totalMove = input
    .split(',')
    .map(d => d.trim())
    .reduce((pos, d) => {
      const turn = d.charAt(0)
      const move = parseInt(d.slice(1))
      const newDirection = turn === 'L'
        ? { x: -pos.direction.y, y:   pos.direction.x }
        : { x:  pos.direction.y, y:  -pos.direction.x }
      return {
        x: pos.x + newDirection.x * move,
        y: pos.y + newDirection.y * move,
        direction: newDirection,
      }
    }, initial)
  return Math.abs(totalMove.x) + Math.abs(totalMove.y)
}

test('day1-test1', t => {
  const input = 'R2, L3'
  const expected = 5
  t.equal(calculateBlocksMoved(input), expected)
  t.end()
})

test('day1-test2', t => {
  const input = 'R2, R2, R2'
  const expected = 2
  t.equal(calculateBlocksMoved(input), expected)
  t.end()
})

test('day1-test3', t => {
  const input = 'R5, L5, R5, R3'
  const expected = 12
  t.equal(calculateBlocksMoved(input), expected)
  t.end()
})

const input = 'R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5'

console.log('Day 1 - Ans.', calculateBlocksMoved(input))
