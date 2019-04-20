const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

// Import route(s)
const paymentAPI = require('./src/routes/payment')

require('dotenv').config()


app.use(helmet())
app.use(bodyParser.json())
app.use(cors())

async function start() {

    // Loads Express API routes
    app.use('/api', paymentAPI)
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(`Connected to the PORT ${process.env.PORT}`)
    })
}

start()