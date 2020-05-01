const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pranav Desai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text.',
        title: 'Help',
        name: 'Pranav Desai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pranav Desai'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        else{
            weather(latitude, longitude, (error, weatherdata) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                else{
                       res.send({
                        forecast: weatherdata,
                        location,
                        address: req.query.address
                       })
                }
            })
        }
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Pranav Desai',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Pranav Desai',
        errorMessage : 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})