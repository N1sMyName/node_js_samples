const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_T0KEN, {polling: true});
const showStartMenu = () => {
    bot.sendMessage(process.env.CHAT_ID, 'Choose feature:', {
        "reply_markup": {
            "keyboard": [["Forecast", "Currency"]]
        }
    })
}

module.exports = {showStartMenu,bot}