const formatForecastOutput = (forecast, date, index) => {
    debugger
    const isStartOfTheDay = /(00|03):00:00/.test(forecast.dt_txt)
    const time = forecast.dt_txt.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
    const dateLine = !index || (isStartOfTheDay && index) ? (`${index ? '\n' : ''}${date}\n`) : ''
    return `${dateLine}${time[0].slice(0, -3)}, ${forecast.main.temp}°C, feels like: ${forecast.main.feels_like}°C , ${forecast.weather[0].description}\n`
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat("en", {
        weekday: "long",
        month: "long",
        day: "numeric"
    }).format(date)
}

const parseArrayIntoTelegramOutput = (array) => {
    return array.toString().replaceAll('\n,', '\n ')
}


module.exports = {formatForecastOutput, formatDate, parseArrayIntoTelegramOutput}