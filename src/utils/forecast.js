const request = require('request')

const forecast = (lati, lang, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=152a722dbef9d76d1c42de884ce16313&query=" + lati + "," + lang
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather forecast", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, "Current temperature is: " + body.current.temperature + " degrees. But it feels like " + body.current.feelslike + " degrees.")
        }
    })

}

module.exports = forecast