const request = require('request')

const statusCheck = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=87fa4098e89ba3dafc76c930b50f96d9&query=' + latitude + ',' + longtitude
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            console.log(url)
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                country: body.location.country,
                region: body.location.region,
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                body_temperature: body.current.feelslike,
                humidity: body.current.humidity,
                visibility: body.current.visibility
            })
        }
    })
}

module.exports = statusCheck