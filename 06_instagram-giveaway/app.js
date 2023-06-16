const fs = require('fs')
const fsPromises = require('fs/promises')
let fileNames;

const getFileNames = async () => {
    return fsPromises.readdir('./assets', {encoding: 'utf-8'})
        .then(files => fileNames = files)
        .catch(error => console.log(error))
        .finally(() => console.log(`done`))


}

getFileNames().then(() => {
    const uniqNames = new Set()
    fileNames.forEach(file => {
        let c = ''
        fsPromises.readFile(`./assets/${file}`, {encoding: "utf-8"}).then(string => {
        const set = new Set(string.split('\n'))
        })
    })

})



