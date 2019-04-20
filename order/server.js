const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors');

const app = express()

// Import route(s)
const orderAPI = require('./src/routes/order')

require('dotenv').config()


app.use(helmet())
app.use(bodyParser.json())
app.use(cors())

async function start() {
    console.log("Connecting to the database")
    await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true
    })
    console.log('Connected to MongoDB!')

    // Loads Express API routes
    app.use('/api', orderAPI)
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(`Connected to the PORT ${process.env.PORT}`)
    })
}

start()