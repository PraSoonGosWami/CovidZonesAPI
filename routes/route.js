const express = require('express')
const controller = require('../controllers/controller')
const router = express.Router()

//@get  @path /stats/:stateCode/
//expects "state code" passed in URL
router.get('/stats/:stateCode/',controller.getStatsByState)

//@get  @path /zones/:stateCode/
//expects "state code" passed in URL
router.get('/zones/:stateCode/',controller.getZonesByState)

//@get  @path /search/location/
//expects "query" in body
router.post('/search/location/',controller.searchLocation)

//@get  @path /check/containment/
//expects "location" in body
router.post('/check/containment/',controller.checkContainmentZone)

module.exports = router