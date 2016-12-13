const test = require('tape')

function isTriangleValid(a, b, c) {
  const longestSide = Math.max(a, Math.max(b, c))
  return longestSide < a + b + c - longestSide
}

test('day3 - isTriangleValid', t => {
  t.equal(isTriangleValid(5, 10, 25), false)
  t.equal(isTriangleValid(3, 4, 5), true)
  t.end()
})

function countValidTriangles(triangles) {
  return triangles.reduce((count, t) =>
      isTriangleValid(t[0], t[1], t[2])
      ? count + 1
      : count
    , 0)
}

test('day3 - countValidTriangles', t => {
  const input = [
    [5, 10, 25],
    [3, 4, 5],
  ]
  t.equal(countValidTriangles(input), 1)
  t.end()
})

const fs = require('fs')


function countValidTrianglesA(path) {
  const input = fs.readFileSync(path, 'utf8')
    .split('\n')
    .map(l => l.match(/\w+\b/gi))
    .filter(l => l)
    .map(l => l.map(n => parseInt(n)))
  return countValidTriangles(input)
}


console.log('Day 3 - Ans.', countValidTrianglesA('./3_input.txt'))

const util = require('util')

function countValidTrianglesB(path) {
  const input = fs.readFileSync(path, 'utf8')
    .match(/\w+\b/gi)
    .reduce((cols, n, i) => {
      cols[i % 3].push(parseInt(n))
      return cols
    }, [[],[],[]])
    .reduce((nums, col) => nums.concat(col), [])

  const triangles = []
  for (let i = 0; i < input.length; i += 3) {
    const triangle = [
      input[i],
      input[i+1],
      input[i+2]
    ]
    triangles.push(triangle)
  }

  return countValidTriangles(triangles)
}

test('day3 - test b', t => {
  t.equal(countValidTrianglesB('./3_input_test.txt'), 3)
  t.end()
})

console.log('Day 3 B - Ans.', countValidTrianglesB('./3_input.txt'))
