const axios = require('axios');

const HttpError = require('../model/http-error');

const API_KEY = process.env.MAPS_API_KEY

async function reverseGeoCode(coordinates) {


    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[0]},${coordinates[1]}&key=${API_KEY}`
    );

    const data = response.data;
    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError(
            'Could not find location for the specified address.',
            422
        );
        throw error;
    }
    const res = data.results[0].formatted_address


    return res;
}

module.exports = reverseGeoCode;

