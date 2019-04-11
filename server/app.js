require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const port = 3000

app.use(cors())
app.use('/', router)


mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@hacktiv8project-qcowo.gcp.mongodb.net/solatdulu?retryWrites=true`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})