const axios = require('axios')
const queryString = require('querystring')
const {formatDate, formatForecastOutput, parseArrayIntoTelegramOutput} = require('./utils')
const {bot, showStartMenu} = require('./telegram-utils')
const baseUrl = 'https://api.openweathermap.org'

const getCoordinatesByCity = async (city = 'Lviv') => {
    const params = queryString.stringify({
        q: city,
        limit: 1,
        appid: process.env.OPEN_WEATHER_TOKEN
    })
    const response = await axios.get(`${baseUrl}/geo/1.0/direct?${params}`)
    if (response?.data?.length) {
        return {lat: response.data[0].lat, lon: response.data[0].lon}
    }
    throw new Error('No coordinates for such city.')
}
const getForecast = async (city) => {
    try {
        const coordinates = await getCoordinatesByCity(city)
        const params = queryString.stringify({
            lat: coordinates.lat,
            lon: coordinates.lon,
            exclude: 'minutely,current,daily,alerts',
            units: 'metric',
            appid: process.env.OPEN_WEATHER_TOKEN
        })
        return await axios.get(`${baseUrl}/data/2.5/forecast?${params}`)
    } catch (error) {
        console.log(error.message)

    }
}


const filterForecast = async (interval, city = "Lviv") => {

    const forecast = await getForecast(city)
    const result = []
    const forecastList = forecast.data.list
    for (let i = 0; i < forecastList.length; i += (interval / 3)) {
        const forecastItem = forecastList[i]
        if (!forecastItem) return
        const date = formatDate(new Date(forecastItem.dt_txt))
        result.push(formatForecastOutput(forecastItem, date, i))
    }
    return result
}

const weatherHandler = (msg) => {
    if (msg.text.toString().toLowerCase().includes('forecast')) {
        bot.sendMessage(process.env.CHAT_ID, "Chose forecast interval: ", {
            "reply_markup": {
                "keyboard": [["3 hrs", "6 hrs"], ["Back"]]
            }
        })
    }

    if (msg.text.toString().toLowerCase().includes('3 hrs')) {
        filterForecast(3)
            .then(forecast => {
                bot.sendMessage(process.env.CHAT_ID, parseArrayIntoTelegramOutput(forecast))
            })
            .catch(() => bot.sendMessage(process.env.CHAT_ID, `Sorry,no forecast available.`))
    }

    if (msg.text.toString().toLowerCase().includes('6 hrs')) {
        filterForecast(6)
            .then(forecast => {
                bot.sendMessage(process.env.CHAT_ID, parseArrayIntoTelegramOutput(forecast))
            })
            .catch(() => bot.sendMessage(process.env.CHAT_ID, `Sorry,no forecast available.`))
    }

    if (msg.text.toString().toLowerCase().includes('back')) {
        showStartMenu()
    }
}


module.exports = {getCoordinatesByCity, getForecast, filterForecast, weatherHandler}