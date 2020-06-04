const express = require('express')
const cors = require('cors')
const route = require('./routes/route')
const HttpError = require('./model/http-error')
const app = express()

const PORT = process.env.PORT || 5000

//adding headers to access API from other hosts
const whitelist = ['https://covidzones.prasoon.me', 'https://covid-zones.web.app']
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json({extended: false}))

app.use('/',route)

//error handling for unknown routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    return next(error)
})

//error handling
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code)
    res.json({message: error.message || 'Something went wrong, server error'})
})


app.listen(PORT,() => console.log(`Server started on PORT ${PORT} ..`))