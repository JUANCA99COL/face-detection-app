const PORT = 4000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
require('dotenv').config()


app.use(cors())
app.get('/', (req, res) => {
    res.json('hi')
})

app.get('/news', (req, res) => {
    
})



app.listen(4000, () => console.log(`Backend is running on port ${PORT}`))
