const {newLine} = require('./constants')

const handleInvalidInputs = (input) => {
    // check if only enter was pressed
    isSingleEnter(input)
    // check if only spaces entered
    isSpacesOnly(input)
    // refuse low length input
    isShortLength(input)
}

const isSingleEnter = (input) => {
    if (input.length === 1 && newLine.test(input)) {
        throw new Error(`Enter at least some think: `)
    }
}
const isSpacesOnly = (input) => {
    const isSpacesOnly = input.split('').every(letter => letter === ' ' || letter === '\n');
    if (isSpacesOnly) {
        throw new Error(`Enter some think else than spaces: `)
    }
}

const isShortLength = (input) => {
    if (input.split(' ').length < 3) {
        throw new Error(`Provide at least three words or numbers: `)
    }
}

const handleInvalidOptions = (option) => {
    if (!option) throw new Error(`Invalid input, you insert ${option}, try number instead...\n To exit type /exit`);
}

module.exports = {handleInvalidInputs}