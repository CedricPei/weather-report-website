const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2VkciIsImEiOiJjbHF4YXNncTMwY2NuMmltdDlpenl5M2NmIn0.04EFPSjE5lNp5fv2qzQWfQ&limit=1'
    // consider using axios; reuse from weather-web
    request({url:url, json: true}, (error, {body}) => {
        // guard statement;
        // prevent nested if/else;
        if (error) {
            // any alternatives? 
            // what is "callback hell"? 
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode