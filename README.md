## CovidZone API

CovidZone API provides data to check if you are in a containment zone or not. The api also provides data of states and district wise zone (Red, Orange, Green) data.

**You cannot use these API end points in your apps or websites**
**The API is protected with cors policies and can only be called from the hoisted website https://covidzones.prasoon.me**
**This repository is only meant to be used for learning or refference purposes**
**If you want to use these APIs in your own websites or apps contact me at support@prasoon.me**

#### API ENDPOINTS

* `https://covid-zones-api.herokuapp.com/zones/:sateCode`

  `https://covid-zones-api.herokuapp.com/zones/WB` returns district wise zone information of state - West Bengal


* `https://covid-zones-api.herokuapp.com/stats/:stateCode`

  `https://covid-zones-api.herokuapp.com/stats/WB` returns state statistics. Total, Active, Recovered, Death cases

* `https://covid-zones-api.herokuapp.com/search/loction` `body = {query: place name}`

  `https://covid-zones-api.herokuapp.com/search/loction` `body = {query: "Park street Kolkata"}`
  returns geocode [lat,lng] for the matched place
  
* `https://covid-zones-api.herokuapp.com/check/containment/` `body = {location : [lat,lng]}`
   returns if the provided coordinates lie in containment zone also return list of containment places within 5Km radius if available
   

#### Sources of data
https://api.covid19india.org/
https://geoiq.io/covid19.html

#### Google maps API <br>
https://cloud.google.com/maps-platform <br>
Geo-coding and reverse geo-coding with google maps API

#### Author's portfolio <br>
Prasoon Goswami <br>
https://prasoon.me
    

