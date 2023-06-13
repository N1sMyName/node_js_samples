const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_T0KEN || 'YOUR HARDCODED TOKEN'
const chatId = process.env.CHAT_ID || 'YOUR HARDCODED ID'
const bot = new TelegramBot(token, {polling: true});
const path = require('path')
const {createReadStream} = require('fs')

const sendMessage = (text) => {
    bot.sendMessage(chatId, text).then(() => {
        console.log(`Message has been sent.`)
        process.exit()
    })
}

const sendPhoto = (pathToImage) => {
    const stream = createReadStream(pathToImage)
    bot.sendPhoto(chatId, stream, {}, {
        "content-type": "application/octet-stream",
        "filename": path.basename(pathToImage)
    }).then(() => {
        console.log(path.basename(pathToImage).slice(0, pathToImage.indexOf('.')))
        console.log(`Photo sent`)
        process.exit()
    })

}

module.exports = {sendPhoto, sendMessage}