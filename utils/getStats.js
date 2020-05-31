const axios = require('axios')

const HttpError = require('../model/http-error')

async function getStats(stateCode) {
    const response = await axios.get(
        'https://api.covid19india.org/data.json'
    );
    const data = response.data

    if(!data){
        throw new HttpError("Server error! Cannot fetch state details",500)
    }


    const res = data.statewise.filter(item => {
        return item.statecode === stateCode
    })

    if(res.length ===0)
        throw new HttpError(`No data available for the provided state code '${stateCode}' `,400)

    return res
}

module.exports = getStats