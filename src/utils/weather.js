const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3962d499e636e647ac96130609feb4d8/' + longitude + ',' + latitude
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(body.error){
            callback('Unable to find location try another search', undefined)
        }
        else{
            weatherdata = 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            callback(undefined, weatherdata)
        }
    })
}


module.exports = weather


