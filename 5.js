const test = require('tape')
const md5 = require('md5')

function calculatePassword(doorId) {
  let password = ''
  let i = 0
  while (password.length < 8) {
    const hash = md5(doorId + i)
    if (hash.slice(0, 5) === '00000') password += hash.slice(5, 6)
    i = i + 1
  }
  return password
}

test('day5 - calculatePassword', t => {
  t.equal(calculatePassword('abc'), '18f47a30')
  t.end()
})

console.log('Day 5 - Ans.', calculatePassword('abbhdwsy'))

function calculatePasswordB(doorId) {
  let password = [null, null, null, null, null, null, null, null]
  let i = 0
  let calculatedDigits = 0
  while(calculatedDigits < 8) {
    const hash = md5(doorId + i)
    if (hash.slice(0, 5) === '00000') {
      const digit = hash.slice(6, 7)
      const position = hash.slice(5, 6)
      if (password[position] === null) {
        calculatedDigits += 1
        password[position] = digit
      }
    }
    i = i + 1
  }
  return password.join('')
}

test('day5b - calculatePassword', t => {
  t.equal(calculatePasswordB('abc'), '05ace8e3')
  t.end()
})

console.log('Day 5 B - Ans.', calculatePasswordB('abbhdwsy'))
