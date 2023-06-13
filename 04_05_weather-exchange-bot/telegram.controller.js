const TelegramBot = require('node-telegram-bot-api');
const {weatherHandler} = require('./weather.controller');
const {bot, showStartMenu} = require('./telegram-utils');
const {currencyController} = require("./currency.controller");


bot.on('message', (msg) => {
    weatherHandler(msg)
    currencyController(msg)


})
const startApp = () => {
    showStartMenu()
}


module.exports = {bot, startApp}