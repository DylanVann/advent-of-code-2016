const test = require('tape')

function calculateFirstRevisit(input) {
  const initial = {
    x: 0,
    y: 0,
    direction: { x: 0, y: 1 },
  }
  const visited = {}
  let pos = initial
  const directions = input
    .split(',')
    .map(d => d.trim())
  for (d of directions) {
    const turn = d.charAt(0)
    const move = parseInt(d.slice(1))
    const newDirection = turn === 'L'
      ? { x: -pos.direction.y, y:   pos.direction.x }
      : { x:  pos.direction.y, y:  -pos.direction.x }
    for (let i = 1; i < move; i++) {
      const x = pos.x + newDirection.x * i
      const y = pos.y + newDirection.y * i
      const key = `${x}-${y}`
      if (key in visited) return visited[key]
      visited[key] = Math.abs(x) + Math.abs(y)
    }
    pos = {
      x: pos.x + newDirection.x * move,
      y: pos.y + newDirection.y * move,
      direction: newDirection,
    }
  }
  return undefined
}

test('day1b-test1', t => {
  const input = 'R8, R4, R4, R8'
  const expected = 4
  t.equal(calculateFirstRevisit(input), expected)
  t.end()
})

const input = 'R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5'

console.log('Day 1 B - Ans.', calculateFirstRevisit(input))
