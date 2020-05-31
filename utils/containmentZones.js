const axios = require('axios');

const HttpError = require('../model/http-error');
const reverseGeoCode = require('./reverseGeoCoding')
const API_KEY = process.env.GEOIQ_API_KEY

async function containmentZones(geoCode) {
    const isContainment = await axios.post(
        'https://data.geoiq.io/dataapis/v1.0/covid/locationcheck',
        data = {key: API_KEY, latlngs: [geoCode]}
    );

    const res = isContainment.data;

    if (!res) {
        const error = new HttpError(
            'Server error! Could not find containment zones for this location',
            422
        );
        throw error;
    }


    const nearbyZones = await axios.post(
        'https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones',
        data = {
            key: API_KEY,
            lng: geoCode[1],
            lat: geoCode[0],
            radius: 5000
        }
    )
    if(!nearbyZones){
        throw new HttpError("Cannot get near by zones",422)
    }
    const nearbyData = nearbyZones.data.containmentZoneNames
    let getAddress
    try {
        getAddress = await reverseGeoCode(geoCode)
    }catch (e) {
        throw e
    }
    return {containment:res.data,nearby:nearbyData,address:getAddress}

}

module.exports = containmentZones;
