
const IONodeWrapper = {
    stdinOnData(callback) {
        process.stdin.on('data', callback)
    },
    stdoutWrite(string) {
        process.stdout.write(string)
    },
    onExit() {
        process.on('exit', () => console.log(`Bye)`))
    },
    checkExit(input) {
        if (input === '/exit') {
            console.clear()

            process.exit(0)
        }
    },
}

module.exports = IONodeWrapper