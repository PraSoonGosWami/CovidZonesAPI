##CovidZone API

CovidZone API provides data to check if you are in a containment zone or not. The api also provides data of states and district wise zone (Red, Orange, Green) data.


####API ENDPOINTS

* `https://covid-zones-api.herokuapp.com/zones/:sateCode`

  `https://covid-zones-api.herokuapp.com/zones/WB` returns district wise zone information of state - West Bengal


* `https://covid-zones-api.herokuapp.com/stats/:stateCode`

  `https://covid-zones-api.herokuapp.com/stats/WB` returns state statistics. Total, Active, Recovered, Death cases

* `https://covid-zones-api.herokuapp.com/search/loction` `body = {query: place name}`

  `https://covid-zones-api.herokuapp.com/search/loction` `body = {query: "Park street Kolkata"}`
  returns geocode [lat,lng] for the matched place
  
* `https://covid-zones-api.herokuapp.com/check/containment/` `body = {location : [lat,lng]}'
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
    

