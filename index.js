// Librairie
const express = require('express')
const logger = require('morgan')

// Création de l'app
const app = express()
const port = 3000

// Plugins
app.use(logger('dev'))

// Body Parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Route racine
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routers
app.use('/article', require('./routes/article'))
app.use('/author', require('./routes/author'))

// Démarrage du serveur
app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
