import inquirer from 'inquirer'
import fs from 'fs'
import {getQuestions, postQuestions} from "./constants.js";


const writeStream = fs.createWriteStream('./db.txt', {encoding: 'utf-8', flags: 'a+'})
const readStream = fs.createReadStream('./db.txt', {encoding: 'utf-8'})

const askQuestions = () => {
    inquirer.prompt(postQuestions, (answers => answers)).then(answers => {
        if (!answers.user) {
            askForSearch()
            return
        }
        writeStream.write(JSON.stringify(answers) + "\n")
        askQuestions()
    })

}

const askForSearch = () => {
    inquirer.prompt(getQuestions, (answers => answers)).then(answers => {
        if (answers.getRequest === 'no') {
            console.log(`bye)`)
            process.exit()
        }
        let res = []

        readStream.on('data', (chunk) => {
            chunk = chunk.split('\n').filter(Boolean).map(i => JSON.parse(i))
            res = [...res, ...chunk]
        })

        readStream.on('end', () => {
            const user = res.find(item => {
                return item.user.toLowerCase().trim() === answers.name.toLowerCase().trim()
            })

            console.log(user ? user : "No user with such name")
            process.exit(0)
        })
    })
}


askQuestions();