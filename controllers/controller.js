
const HttpError = require('../model/http-error')

const getStats = require('../utils/getStats')
const getZones = require('../utils/getZones')
const getGeoCode = require('../utils/geocoding')
const containmentZones = require('../utils/containmentZones')


//gets state wise data of current stats
// active | recovered | total | death | last update time | State notes
const getStatsByState = async (req, res, next) =>{
    console.log(req)
    const stateCode = req.params.stateCode;
    if(!stateCode){
        return next(new HttpError("No state code passed",400))
    }
    let stats
    try{
        stats = await getStats(stateCode)
    }catch (e) {
        return next(e)
    }

    res.status(200).json(stats)
}


//gets district wise zones for given state
const getZonesByState = async (req, res, next) =>{
    const stateCode = req.params.stateCode;
    if(!stateCode){
        return next(new HttpError("No state code passed",400))
    }
    let stats
    try{
        stats = await getZones(stateCode)
    }catch (e) {
        return next(e)
    }
    res.status(200).json(stats)

}

//searches for user query
//returns array of result containing matched places and their coordinates
const searchLocation = async (req, res, next) => {
    const query = req.body.query
    if(!query){
        return next(new HttpError("No query string passed",400))
    }
    let searchRes
    try{
        searchRes = await getGeoCode(query)
    }
    catch (error) {
        return next(error);
    }

    res.status(200).json(searchRes)
}

//check if the provided geocode lies in a containment zone
//also gets nearby containment zones within 5km radius
const checkContainmentZone = async (req, res, next) =>{
    //getting the geo code
    const location = req.body.location

    if(!location)
        return next(new HttpError('Location details not received',402))
    //checks if location is in format - [lat,lng]
    if(location.constructor !== Array || location.length !== 2)
        return next(new HttpError('Bad input format for location',400))
    //getting the data
    let data
    try{
        data = await containmentZones(location)

    }catch (e) {
        return next(e);
    }

    if(!data){
        return next(new HttpError('Server error! No data found!'))
    }

    res.status(200).json(data)

}

exports.getStatsByState = getStatsByState
exports.getZonesByState = getZonesByState
exports.searchLocation = searchLocation
exports.checkContainmentZone = checkContainmentZone
