const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname, "../public")))


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Mitesh"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: "Mitesh"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        para: "HEllo from help page",
        title: 'Help',
        name: 'Mitesh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address is not entered"
        })
    }
    geocode(req.query.address, (error, { lattitude, longitude, name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lattitude, longitude, (error, fore) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: name,
                forecast: fore,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        error: "Help Article not found",
        title: "404",
        name: "Mitesh"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: "Page not Found",
        title: "404 Error",
        name: "Mitesh"
    })
})

app.listen(port, () => {
    console.log("Server is up at port " + port)
})