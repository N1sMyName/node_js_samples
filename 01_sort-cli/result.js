const IO = require('./input-output')
const {options} = require('./constants')
const sortUtility = require("./sort");

class Result {
    constructor(input) {
        process.env.INPUT = input;
        this.input = input
        this.sortActionsMap = this.createActionMap(options)
        this.menu()
    }

    menu() {
        this.displayOptions()
        console.log(`How would you like to sort values?(option number)`);
        IO.stdinOnData((buffer) => {
            const option = buffer.toString()
            try {
                console.clear()
                this.sort(+option)

            } catch (err) {
                console.clear()
                IO.stdoutWrite(err.message)
                this.menu()

            }
        })
    }

    sort(input) {
        console.clear()
        if (!input) throw new Error(`Invalid input, you insert ${input}, try number instead...\n To exit type /exit`);
        let sortResult = this.sortActionsMap.get(input)(this.input);
        if (!sortResult) throw new Error(`No such option, you insert ${input}, try another...\n To exit type /exit`)
        // filter out falsy values
        sortResult = sortResult.filter(Boolean)
        // display menu again
        this.displayOptions()
        // format output
        IO.stdoutWrite(sortResult.length ? `\nOutput: \n${JSON.stringify(sortResult, null, 3)}\n` : "Output is empty for provided filer...\n")


    }

    displayOptions() {
        options.forEach((option, index) => IO.stdoutWrite(`${index + 1}. ${option}\n`))
        IO.stdoutWrite('*. To exit type /exit \n')
    }

    createActionMap(options) {
        const map = new Map()
        map.set(1, sortUtility.sortAlphabetically)
        map.set(2, sortUtility.numbersAsc)
        map.set(3, sortUtility.numbersDesc)
        map.set(4, sortUtility.wordsAscByLetterNumber)
        map.set(5, sortUtility.uniqWords)
        map.set(6, sortUtility.uniqValues)
        return map;
    }


}

module.exports = Result