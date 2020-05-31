const axios = require('axios');

const HttpError = require('../model/http-error');

const API_KEY = process.env.MAPS_API_KEY

async function getGeoCode(address) {


    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError(
            'Could not find location for the specified address.',
            422
        );
        throw error;
    }
    let res = []
    data.results.map(result =>{
        res.push({address: result.formatted_address,geo:result.geometry.location})
    })

    return res;
}

module.exports = getGeoCode;

