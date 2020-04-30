const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=pk.eyJ1Ijoic3RhcnNwaWNlIiwiYSI6ImNrNzRzenhhajA4c2kzZW50dGdpYXgwY3cifQ.t_eS1oPut9LVvLAHR0zEHw'
    request({url, json : true}, (error, { body } = {}) => {
        if(error){
            callback('unable to connect with the server', undefined)
        }
        else if(body.features.length === 0){
            callback('incorrect location', undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode