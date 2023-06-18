const fsPromises = require('fs/promises')
const {quickSort} = require('./quickSort')
const {binarySearch} = require('./binarySearch')

let sortedFiles;
const prepareToRead = async () => {
    return fsPromises.readdir('./assets', {encoding: 'utf-8'})
        .then(files => files.map(name => fsPromises.readFile(`./assets/${name}`, {encoding: "utf-8"})))
        .catch(error => console.log(error))
}


const readFiles = async () => {
    const promises = await prepareToRead();
    const files = []
    // read files
    for await (const string of promises) {
        files.push(string.split('\n'))
    }
    return files
}

const existInFile = (value, existTimes) => {
    let counter = 0
    for (let i = 0; i < sortedFiles.length; i++) {
        const result = binarySearch(sortedFiles[i], value)
        if (result !== -1) counter++
        if (counter === existTimes) break
    }
    return (counter === existTimes) ? value : null

}


const getUniqValues = () => {
    const result = new Set()
    for (let i = 0; i < sortedFiles.length; i++) {
        const file = sortedFiles[i]
        let word;
        for (let j = 0; j < file.length; j++) {
            word = file[j]
            result.add(word)
        }
    }
    return Array.from(result)
}
const valuesOccursOnEach = (uniqValues, filesCount = sortedFiles.length) => {
    const result = new Set()
    for (const uniqValue of uniqValues) {
        const isExist = existInFile(uniqValue, filesCount)
        if (isExist) result.add(isExist)
    }
    return result.size
}

readFiles().then((files) => {

        console.time('quick-sort')
        sortedFiles = files.map(file => quickSort(file))
        console.timeEnd('quick-sort')

        console.time('Uniq values')
        const uniqValues = getUniqValues()
        console.timeEnd('Uniq values')
        console.log(uniqValues.length)


        console.time(`Occurs one time in each file`)
        const onAll = valuesOccursOnEach(uniqValues);
        console.timeEnd(`Occurs one time in each file`)
        console.log(onAll)

        console.time(`Occurs one time in 10 files`)
        const onTen = valuesOccursOnEach(uniqValues, 10);
        console.timeEnd(`Occurs one time in 10 files`)
        console.log(onTen)

    }
)
