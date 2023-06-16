
const inputErrorHandler = (input) => {
    isSpacesOnly(input)
    isShortLength(input)
}

const isSpacesOnly = (input) => {
    const isSpacesOnly = input.split('').every(letter => letter === ' ' || letter === '\n');
    if (isSpacesOnly) {
        throw new Error(`Enter some think else than spaces: `)
    }
}

const isShortLength = (input) => {
    if (input.split(' ').length < 3) {
        throw new Error(`Provide at least three words or numbers separated by spaces: `)
    }
}

module.exports = {handleInvalidInputs: inputErrorHandler}