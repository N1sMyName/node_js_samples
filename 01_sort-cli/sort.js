const {numbersOnlyRegExp} = require('./constants')
const sortUtility = {
    sortAlphabetically(input) {
        let words = input.split(' ').map(word => word.toString().toLowerCase())
        let wordsOnly = words.filter(word => !numbersOnlyRegExp.test(word))
        return wordsOnly.sort()
    },
    numbersAsc(input) {
        let numbers = input.split(' ').filter(string => numbersOnlyRegExp.test(string))
        return numbers.sort((a, b) => a - b)
    },
    numbersDesc(input) {
        let numbers = input.split(' ').filter(string => numbersOnlyRegExp.test(string))
        return numbers.sort((a, b) => b - a)
    },
    wordsAscByLetterNumber(input) {
        const words = input.split(' ')
        let wordsOnly = words.filter(word => !numbersOnlyRegExp.test(word))
        return wordsOnly.sort((a, b) => a.length - b.length)
    },
    uniqWords(input) {
        let values = input.split(' ')
        values = values.filter(word => !numbersOnlyRegExp.test(word))
        let result = new Set()
        values.forEach(word => result.add(word))
        return Array.from(result) || []
    },
    uniqValues(input) {
        let values = input.split(' ')
        let result = new Set()
        values.forEach(word => result.add(word))
        return Array.from(result) || []
    }
}

module.exports = sortUtility
