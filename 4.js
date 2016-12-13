const test = require('tape')

function getChecksum(line) {
  return line.match(/\[(.*)\]/)[1]
}

test('day4 - getChecksum', t => {
  t.equal(getChecksum('aaaaa-bbb-z-y-x-123[abxyz]'), 'abxyz')
  t.end()
})

function getLetters(line) {
  return line.slice(0, line.indexOf('['))
    .split('')
    .filter(c => c !== '-')
    .filter(c => isNaN(parseInt(c, 10)))
}

test('day4 - getLetters', t => {
  const expectedLetters = ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'z', 'y', 'x']
  t.deepEqual(getLetters('aaaaa-bbb-z-y-x-123[abxyz]'), expectedLetters)
  t.end()
})

function getLettersCounts(letters) {
  return letters.reduce((counts, c) => {
    counts[c] = counts[c]
      ? counts[c] + 1
      : 1
    return counts
  }, {})
}

test('day4 - getLettersCounts', t => {
  const letters = ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'z', 'y', 'x']
  const expectedLettersCounts = {
    'a': 5,
    'b': 3,
    'x': 1,
    'y': 1,
    'z': 1,
  }
  t.deepEqual(getLettersCounts(letters), expectedLettersCounts)
  t.end()
})

function getSectorId(line) {
  return parseInt(line.slice(0, line.indexOf('['))
    .split('')
    .filter(c => c !== '-')
    .filter(c => !isNaN(parseInt(c, 10)))
    .join(''))
}

test('day4 - getSectorId', t => {
  t.equal(getSectorId('aaaaa-bbb-z-y-x-123[abxyz]'), 123)
  t.end()
})

function isRealRoom(line) {
  const checksum = getChecksum(line)
  const lettersCounts = getLettersCounts(getLetters(line))
  const letters = Object.keys(lettersCounts)
  const counts = Object.values(lettersCounts)
  const lettersForCount = {}
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]
    const count = '' + counts[i]
    lettersForCount[count] = count in lettersForCount
      ? lettersForCount[count].concat(letter)
      : [letter]
  }
  const lettersForCountKeys = Object.keys(lettersForCount)
  const lettersForCountVals = Object.values(lettersForCount)
  const lettersWithVals = []
  for (let i = 0; i < lettersForCountVals.length; i++) {
    const key = lettersForCountKeys[i]
    const letters = lettersForCountVals[i]
    lettersWithVals.push({ count: parseInt(key), letters })
  }
  const sorted = lettersWithVals.sort((a, b) => a.count < b.count)
  const validChecksum = sorted
    .reduce((key, obj) => key + obj.letters.sort().join(''), '')
    .slice(0, 5)
  return checksum === validChecksum
}

test('day4 - isRealRoom', t => {
  t.equal(isRealRoom('aaaaa-bbb-z-y-x-123[abxyz]'), true)
  t.equal(isRealRoom('a-b-c-d-e-f-g-h-987[abcde]'), true)
  t.equal(isRealRoom('not-a-real-room-404[oarel]'), true)
  t.equal(isRealRoom('totally-real-room-200[decoy]'), false)
  t.end()
})

function sumOfSectorIds(codes) {
  return codes
    .filter(isRealRoom)
    .reduce((sum, code) => sum + getSectorId(code), 0)
}

test('day4 - sumOfSectorIds', t => {
  const input = [
  'aaaaa-bbb-z-y-x-123[abxyz]',
  'a-b-c-d-e-f-g-h-987[abcde]',
  'not-a-real-room-404[oarel]',
  'totally-real-room-200[decoy]',
  ]
  t.equal(sumOfSectorIds(input), 1514)
  t.end()
})

const fs = require('fs')
const input = fs.readFileSync('./4_input.txt', 'utf8')
  .split('\n')
  .filter(l => l)

console.log('Day 4 - Ans.', sumOfSectorIds(input))

function shiftInRange(min, max, num, shift) {
  const range = max - min + 1
  const shiftRemainder = Math.sign(shift) * (Math.abs(shift) % (range))
  const shifted = num + shiftRemainder
  if (shifted > max) return shifted - range
  if (shifted < min) return shifted + range
  return shifted
}

test('day4 - shiftInRange', t => {
  t.equal(shiftInRange(5, 10, 7, -3), 10)
  t.equal(shiftInRange(5, 10, 7, -2), 5)
  t.equal(shiftInRange(5, 10, 7, -1), 6)
  t.equal(shiftInRange(5, 10, 7, 0), 7)
  t.equal(shiftInRange(5, 10, 7, 1), 8)
  t.equal(shiftInRange(5, 10, 7, 2), 9)
  t.equal(shiftInRange(5, 10, 7, 3), 10)
  t.equal(shiftInRange(5, 10, 7, 4), 5)
  t.equal(shiftInRange(5, 10, 7, 5), 6)
  t.end()
})

function shiftLetter(letter, num) {
  if (letter === '-') return ' '
  const charCode = letter.charCodeAt(0)
  return String.fromCharCode(shiftInRange(97, 122, charCode, num))
}

test('day4 - shiftLetter', t => {
  t.equal(shiftLetter('z', 1), 'a')
  t.equal(shiftLetter('a', 1), 'b')
  t.equal(shiftLetter('-', 0), ' ')
  t.end()
})

function rotateLetters(letters, num) {
  return letters
    .map(c => shiftLetter(c, num))
    .join('')
}

test('day4 - rotateLetters', t => {
  const code = 'qzmt-zixmtkozy-ivhz'
  const letters = code.split('')
  t.equal(rotateLetters(letters, 343), 'very encrypted name')
  t.end()
})

console.log('Day 4 B - Ans.', input
  .filter(isRealRoom)
  .map(line => {
    const sectorId = getSectorId(line)
    const name = line
      .slice(0, line.indexOf(sectorId) - 1)
      .split('')
      .map(c => shiftLetter(c, sectorId))
      .join('')
    return {
      name,
      sectorId,
    }
  })
  .find(line => line.name.includes('north')).sectorId)
