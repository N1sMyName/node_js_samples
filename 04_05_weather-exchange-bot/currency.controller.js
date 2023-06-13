const axios = require('axios')
const NodeCache = require('node-cache')
const {bot, showStartMenu} = require("./telegram-utils");

const cache = new NodeCache()
// constants
const privatBankPublic = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
const monoBankPublic = "https://api.monobank.ua/bank/currency"
const usdMonoCurrencyCodeA = 840
const eurMonoCurrencyCodeA = 978

const getMono = async (currency) => {
    const monoCache = cache.get(`mono-${currency}`)
    if (monoCache) {
        console.group(`mono cache`)
        return `Buy=${monoCache.rateBuy}\nSell=${monoCache.rateSell}\nCached`
    }
    const response = await axios.get(monoBankPublic)

    const currencyData = await response.data.find(item => item.currencyCodeA === ((currency === 'usd') ? usdMonoCurrencyCodeA : eurMonoCurrencyCodeA))
    cache.set(`mono-${currency}`, currencyData, 61)
    console.group('call')
    return `Buy=${currencyData.rateBuy}\nSell=${currencyData.rateSell}\n`

}
const getPrivat = async (currency) => {
    const privatCache = cache.get(`privat-${currency}`)

    if (privatCache) {
        return `Buy=${privatCache.buy}\nSell=${privatCache.sale}\nCached`
    }
    const res = await axios.get(privatBankPublic)
    const currencyData = await res.data.find(currencyData => currencyData.ccy.toLowerCase() === currency)
    cache.set(`privat-${currency}`, currencyData, 61)
    return `Buy=${currencyData.buy}\nSell=${currencyData.sale}\nCached`
}
const getBankCurrency = async (bank, currency) => {
    if (bank === 'privat') {
        return getPrivat(currency)
    }
    return getMono(currency)

}
const currencyController = (msg) => {
    if (msg.text.toString().toLowerCase().includes('currency')) {
        bot.sendMessage(process.env.CHAT_ID, "Chose bank: ", {
            "reply_markup": {
                "keyboard": [["privat", "mono"]]
            }
        })
    }
    if (/(privat|mono)-[a-zA-Z]{3}/.test(msg.text.toString().toLowerCase())) {

        const [bank, currency] = msg.text.toString().toLowerCase().split('-')
        getBankCurrency(bank, currency).then(response => {
            bot.sendMessage(process.env.CHAT_ID, response)
        })

    }
    if (msg.text.toString().toLowerCase() === 'privat') {

        bot.sendMessage(process.env.CHAT_ID, "Chose currency type: ", {
            "reply_markup": {
                "keyboard": [["privat-usd", "privat-eur"], ["back"]]
            },
        })
    }

    if (msg.text.toString().toLowerCase() === 'mono') {
        bot.sendMessage(process.env.CHAT_ID, "Chose bank: ", {
            "reply_markup": {
                "keyboard": [["mono-usd", "mono-eur"], ["main menu"]]
            }
        })
    }

    if (msg.text.toString().toLowerCase().includes('back')) {
        showStartMenu()
    }

}

module.exports = {currencyController}


