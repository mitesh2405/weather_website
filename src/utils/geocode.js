const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWl0ZXNoMjQwNSIsImEiOiJja2VzN2tib3gzOTVhMnFucGtyeWppMW1xIn0.ph5JEupQue822Akdasg2dg&limit=1"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Input a valid location', undefined)
        }
        else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                name: body.features[0].place_name

            })
        }
    })
}


module.exports = geocode
