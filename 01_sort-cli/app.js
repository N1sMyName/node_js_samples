const IO = require('./input-output')
const Result = require('./result')
const {handleInvalidInputs} = require('./errors')
let result;
// clear node start info
console.clear()
// handle exit
IO.onExitLogger()

const checkInputValidity = (input) => {
    if (process.env.INPUT) return

    try {
        console.clear()

        // check if input valid
        handleInvalidInputs(input)

        // initialize result object
        result = new Result(input)
    } catch (err) {
        IO.stdoutWrite(`${err.message}`)
    }
}
const start = () => {
    IO.stdoutWrite(`Enter words or/and numbers divided by spaces: `)
    IO.stdinOnData((buffer) => {
        // transform buffer to string and remove new line
        const input = buffer.toString().replace('\n', '')
        checkInputValidity(input)
        IO.checkExitCondition(input)
    })
}

start()


