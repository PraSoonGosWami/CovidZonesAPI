const axios = require('axios');

const HttpError = require('../model/http-error');

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
    if (!res.data[0].containmentsAvailability) {
        throw new HttpError('Containment zone data not available for your location', 422)
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

    return {containment:res.data,nearby:nearbyData}


}

module.exports = containmentZones;
