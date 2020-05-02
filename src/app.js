const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and viws location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Göran Lindqvist'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Göran Lindqvist'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Göran Lindqvist'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // return console.log({error})
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastcData) => {
            // forecast(60.39306,25.66389, (error, data) => { //Porvoo
            if (error) {
                // return console.log({error})
                return res.send({error})
            }

            // console.log(location)
            // console.log(forecastcData)
            res.send({
                forecast: forecastcData, //'Cloudy',
                location: location, //'Philadelphia',
                address: req.query.address //'Philadelphia'
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Göran Lindqvist',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Göran Lindqvist',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})