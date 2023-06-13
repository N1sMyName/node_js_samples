const options = [
    "Sort words alphabetically",
    "Show numbers from lesser to greater",
    "Show numbers from bigger to smaller",
    "Display words in ascending order by number of letters in the word",
    "Show only unique words",
    "Display only unique values from the set of words and numbers entered by the user",
]

const numbersOnlyRegExp = new RegExp("[0-9]+")

module.exports = {options, numbersOnlyRegExp}